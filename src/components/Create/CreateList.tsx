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
      <header className="list-head">
        Here you can view all of your contributions to the community
      </header>

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
