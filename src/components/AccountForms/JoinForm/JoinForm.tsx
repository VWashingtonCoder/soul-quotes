import { useState } from "react";
import FormInputBase from "../../FormInputBase/FormInputBase";
import { FormValues } from "../../../types";

const joinFormInputs = [
  {
    key: "join-username",
    id: "username",
    label: "Username",
    type: "text",
  },
  {
    key: "join-email",
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    key: "join-password",
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    key: "join-confirm-password",
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
  },
];

export default function JoinForm() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  } as FormValues);
  const [error, setError] = useState({} as FormValues);

  function validateAlphaNumeric(value: string) {
    if (!value.match(/^[a-zA-Z0-9]*$/)) {
      return false;
    }
    return true;
  }

  function validateForm(formValues: FormValues) {
    const formErrors = {} as FormValues;
    let formIsValid = true;

    Object.keys(formValues).forEach((key) => {
      const value = formValues[key].trim();
      switch (key) {
        case "username":
          if (!value || typeof value === "undefined") {
            formIsValid = false;
            formErrors[key] = "Username is required";
          } else if (value.length < 3) {
            formIsValid = false;
            formErrors[key] = "Username must be at least 3 characters long";
          } else if (value.length > 20) {
            formIsValid = false;
            formErrors[key] = "Username must be less than 20 characters long";
          } else if (!validateAlphaNumeric(value)) {
            formIsValid = false;
            formErrors[key] = "Only letters and numbers are allowed";
          }
          break;
        case "email":
            if (!value || typeof value === "undefined") {
                formIsValid = false;
                formErrors[key] = "Email is required";
            } else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                formIsValid = false;
                formErrors[key] = "Email is invalid";
            }
            break;
        // case "password":
        //     if (!value || typeof value === "undefined") {
        //         formIsValid = false;
        //         formErrors[key] = "Password is required";
        //     } else if (value.length < 8) {
        //         formIsValid = false;
        //         formErrors[key] = "Password must be at least 8 characters long";
        //     } else if (value.length > 20) {
        //         formIsValid = false;
        //         formErrors[key] = "Password must be less than 20 characters long";
        //     }
        //     break;
        default:
          break;
      }
    });
    console.log(formErrors);
    console.log(formIsValid);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm(formValues);
  };
  return (
    <form className="account-form join" onSubmit={handleSubmit}>
      <h2>Join Our Wonderful Quote Community</h2>
      {Object.keys(error).length > 0 && (
        <ul className="error-list">
          <p>There were errors with your submission:</p>
          {Object.keys(error).map((key) => (
            <li key={key}>{error[key]}</li>
          ))}
        </ul>
      )}

      {joinFormInputs.map((input) => {
        const { id, key, label, type } = input;

        return (
          <FormInputBase
            key={key}
            id={id}
            label={label}
            type={type}
            value={formValues[id]}
            change={handleInputChange}
          />
        );
      })}
      <input type="submit" />
    </form>
  );
}
