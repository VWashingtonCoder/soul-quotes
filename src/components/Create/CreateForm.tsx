import { useState } from "react";
import FormInput from "../shared/FormInput";
import CategorySelect from "../shared/CategorySelect";

type CreateFormValues = {
  quoteText: string;
  author: string;
  genre: string;
};

const initialCreateFormValues = {
  quoteText: "",
  author: "",
  genre: "all",
};

function CreateForm() {
  const [createFormValues, setCreateFormValues] = useState<CreateFormValues>(
    initialCreateFormValues
  );
  const [error, setError] = useState<CreateFormValues>({} as CreateFormValues);
  const { quoteText, author, genre } = createFormValues;
  const disabled = !quoteText || !author || genre === "all";

  const updateForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setCreateFormValues((prevFormValues) => ({
      ...prevFormValues,
      [id]: value,
    }));
  };

  const updateGenre = (category: string) => {
    setCreateFormValues((prevFormValues) => ({
      ...prevFormValues,
      genre: category,
    }));
  };

  function validateForm() {
    const { quoteText, author } = createFormValues;
    const newError = {} as CreateFormValues;

    if (quoteText.trim().length < 5) {
      newError.quoteText = "Quote text must be at least 5 characters.";
    }

    if (author.trim().length < 3) {
      newError.author = "Author name must be at least 3 characters.";
    }

    return newError;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError = validateForm();

    if (Object.keys(newError).length === 0) {
      console.log("Form is valid!");
      // submitForm();
      // resetForm();
    }

    setError(newError);
  };

  return (
    <form className="form create" onSubmit={handleSubmit}>
      <header>
        Add your own quotes to the
        community and help enrich the lives of others.
      </header>

      <div className="inputs-group">
        <FormInput
          label="Quote"
          type="textarea"
          id="quoteText"
          value={quoteText}
          textChange={updateForm}
        />

        <FormInput
          label="Author"
          type="text"
          id="author"
          value={author}
          textChange={updateForm}
        />

        <CategorySelect
          searchCategory={genre}
          setSearchCategory={updateGenre}
          noSearch={true}
        />
      </div>

      <button type="submit" className="submit-button" disabled={disabled}>
        Submit
      </button>
    </form>
  );
}

export default CreateForm;
