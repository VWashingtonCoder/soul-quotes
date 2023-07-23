import { useState } from "react";
import { FormValues, FormValuesErrors } from "../../types.ts"
import { useAppContext } from "../../hooks/CustomUseHooks";
import { CategorySelect } from "../CategorySelect/CategorySelect";
import FormErrors from "../FormErrors/FormErrors.tsx";

import "./CreateQuote.css";

const createFormValues: FormValues = {
    quote: "",
    author: "",
    category: "all"
}

export default function CreateQuote() {
    const { addNewQuote } = useAppContext();
    const [formValues, setFormValues] = useState(createFormValues);
    const [formErrors, setFormErrors] = useState({} as FormValuesErrors);
    const errorsArray = Object.values(formErrors);

    function validateCreateForm(form: FormValues) {
        let valid = true; 
        let errors = {};

        Object.entries(form).forEach(formValue => {
            const [key, value] = formValue
            const trimValue = value.trim();
            
            if (key === "quote" && trimValue.length < 10) {
                valid = false;
                errors = { ...errors, [key]: "Quote should be at least 10 characters." }
            } else if (key === "author" && trimValue.length < 5) {
                valid = false;
                errors = { ...errors, [key]: "Author should be at least 5 characters." }
            } else if (key === "category" && value === "all") {
                valid = false;
                errors = { ...errors, [key]: "You must pick a category." }
            }
        })

        return { valid, errors };
    }

    const updateFormValues = (e: { target: { name: string, value: string } }) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { valid, errors } = validateCreateForm(formValues);
        console.log(valid);
        
        if (valid) {
            addNewQuote(formValues);
            // setFormValues(createFormValues);
        }

        setFormErrors(errors);
    }


    return (
        <section className="page create">
            <h2 className="page-title">Create Your Own Quote</h2>

            <form id="createForm" onSubmit={submitForm}>
                {errorsArray.length > 0 && (
                    <FormErrors 
                        errors={errorsArray} 
                        formKey="create" 
                    />       
                )}

                <div className="form-input-container flex-align-center">
                    <label className="input-label">Quote*: </label>
                    <textarea
                        className="form-input quote"
                        name="quote"
                        cols={30}
                        rows={3}
                        placeholder="To Make Or Not Make A Quote...That Is The Question."
                        value={formValues.quote}
                        onChange={updateFormValues}
                        required
                    />
                </div>

                <div className="form-input-container flex-align-center">
                    <label className="input-label">Author*: </label>
                    <input
                        className="form-input author"
                        name="author"
                        type="text"
                        placeholder="Author Name"
                        value={formValues.author}
                        onChange={updateFormValues}
                        required
                    />
                </div>

                <div className="form-input-container flex-align-center">
                    <label className="input-label">Category*: </label>
                    <CategorySelect 
                        value={formValues.category} 
                        change={updateFormValues} 
                    />
                </div>

                <input className="submit-btn" type="submit" />

            </form>
        </section>
    )
}