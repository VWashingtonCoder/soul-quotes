import { useState } from "react";
import { useUser, useQuote } from "../../context-hooks";
import CategorySelect from "../shared/CategorySelect";
import ListTable from "../shared/ListTable";

function CreateList() {
  const { allQuotes } = useQuote();
  const { activeUser } = useUser();
  const [searchCategory, setSearchCategory] = useState("all");
  const userCreations = allQuotes.filter(
    (quote) => quote.creatorId === activeUser?.userId
  );
  const creationsList =
    searchCategory === "all"
      ? userCreations
      : userCreations.filter((quote) =>
          quote.category.includes(searchCategory)
        );

  return (
    <div className="creation-list">
      <h3 className="page-subtitle">Your Creations</h3>
      <CategorySelect
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
        noSearch={true}
      />
      <ListTable list={creationsList} />
    </div>
  );
}

export default CreateList;
