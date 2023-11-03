import { useState } from "react";
import TextInput from "../components/TextInput";
import CategorySelect from "../components/CategorySelect";

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
  const { quoteText, author, genre } = createFormValues;
  const disabled = !quoteText || !author || genre === "all";

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <form id="CreateForm">
      <header>
        Use this form to create a new quote. Add your own quotes to the
        community and help enrich the lives of others.
      </header>

      <div className="inputs-group">
        <TextInput
          label="Quote"
          type="text"
          id="quoteText"
          value={quoteText}
          onChange={updateForm}
        />

        <TextInput
          label="Author"
          type="text"
          id="author"
          value={author}
          onChange={updateForm}
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
