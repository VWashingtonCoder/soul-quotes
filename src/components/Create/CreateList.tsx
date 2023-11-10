import { useState } from "react";
import { useUser, useQuote } from "../../context-hooks";
import SelectInput from "../shared/SelectInput";
import ListTable from "../shared/ListTable";

function CreateList() {
  const { allQuotes } = useQuote();
  const { activeUser } = useUser();
  const [searchCategory, setSearchCategory] = useState("all");
  console.log(allQuotes)
  const userCreations = allQuotes.filter(
    (quote) => quote.creatorId === activeUser?.userId
  );
  const creationsList =
    searchCategory === "all"
      ? userCreations
      : userCreations.filter((quote) =>
          quote.category.includes(searchCategory)
        );

  const updateSearchCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCategory(e.target.value);
  };

  return (
    <div className="creation-list">
      <header className="list-head">
        Here you can view all of your contributions to the community
      </header>

      <SelectInput
        label="Filter By Category:"
        value={searchCategory}
        onChange={updateSearchCategory}
      />

      <ListTable list={creationsList} />
    </div>
  );
}

export default CreateList;
