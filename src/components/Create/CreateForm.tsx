import { useState } from "react";
import { useQuote, useUser } from "../../context-hooks";
import TextInput from "../shared/TextInput";
import SelectInput from "../shared/SelectInput";
import { Quote } from "../../types";

type CreateFormValues = {
  quoteText: string;
  author: string;
  category: string;
};

const initialCreateFormValues = {
  quoteText: "",
  author: "",
  category: "all",
};

function CreateForm() {
  const { addNewQuote, allQuotes } = useQuote();
  const { activeUser, addToFavorites } = useUser();

  const [createFormValues, setCreateFormValues] = useState<CreateFormValues>(
    initialCreateFormValues
  );
  const [error, setError] = useState<CreateFormValues>({} as CreateFormValues);
  const { quoteText, author, category } = createFormValues;

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

  const updateGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateFormValues((prevFormValues) => ({
      ...prevFormValues,
      category: e.target.value,
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

  const submitForm = () => {
    const currentCategoryQuotes = allQuotes.filter(
      (quote) => quote.category === category
    );
    const lastCurrentCategoryQuoteId =
      currentCategoryQuotes[currentCategoryQuotes.length - 1].quoteId;

    console.log(lastCurrentCategoryQuoteId);

    // const newQuote = {
    //   quoteText,
    //   author,
    //   category,
    //   id: Math.floor(Math.random() * 1000000),
    // };
    // addNewQuote(newQuote);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError = validateForm();

    if (Object.keys(newError).length === 0) {
      console.log("Form is valid!");
      submitForm();
      // setCreateFormValues(initialCreateFormValues);
    }

    setError(newError);
  };

  return (
    <form className="form create" onSubmit={handleSubmit}>
      <header>
        Add your own quotes to the community and help enrich the lives of
        others.
      </header>

      <div className="inputs-group">
        <TextInput
          label="Quote:"
          type="textarea"
          id="quoteText"
          value={quoteText}
          onChange={updateForm}
        />

        <TextInput
          label="Author:"
          type="text"
          id="author"
          value={author}
          onChange={updateForm}
        />

        <SelectInput
          label="Category:"
          value={category}
          onChange={updateGenre}
        />
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={!quoteText || !author || category === "all"}
      >
        Submit
      </button>
    </form>
  );
}

export default CreateForm;
