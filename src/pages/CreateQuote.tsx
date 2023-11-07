import { useState } from "react";
import { useUser, useQuote } from "../context-hooks";
import CreateForm from "../forms/CreateForm";
import CategorySelect from "../components/shared/CategorySelect";
import FavoritesTable from "../components/shared/FavoritesTable";
import "../styles/CreateQuote.scss";

function CreateQuote() {
  const { allQuotes } = useQuote();
  const { activeUser } = useUser();
  const [createView, setCreateView] = useState("form" as "form" | "list");
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
    <div className="create page">
      <nav className="page header">
        <div className="page views">
          <button
            className={`nav-link view-btn ${
              createView === "form" ? "active" : ""
            }`}
            onClick={() => setCreateView("form")}
          >
            Form
          </button>
          <button
            className={`nav-link view-btn ${
              createView === "list" ? "active" : ""
            }`}
            onClick={() => setCreateView("list")}
          >
            List
          </button>
        </div>
      </nav>

      <div className="page-content">
        <CreateForm />

        <div className="creation-list">
          <h3 className="page-subtitle">Your Creations</h3>
          <CategorySelect
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            noSearch={true}
          />
          <FavoritesTable favoriteList={creationsList} />
        </div>
      </div>
    </div>
  );
}

export default CreateQuote;
