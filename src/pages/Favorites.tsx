import { useState } from "react";
import { useUser, useQuote } from "../context-hooks";
import CategorySelect from "../components/CategorySelect";
import FavoritesTable from "../components/FavoritesTable";
import "../styles/Favorites.scss";

type TableViewType = "favorites" | "contributions";

function Favorites() {
  const { activeUser, activeUserFavorites } = useUser();
  const { allQuotes } = useQuote();
  const [tableView, setTableView] = useState("favorites" as TableViewType);
  const [favoritesCategory, setFavoritesCategory] = useState("all");
  const [creationsCategory, setCreationsCategory] = useState("all");
  const userFavorites = allQuotes.filter((quote) =>
    activeUserFavorites.map((favorite) => favorite.qId).includes(quote.quoteId)
  );
  const userCreations = allQuotes.filter(
    (quote) => quote.creatorId === activeUser?.userId
  );
  const favoritesList =
    favoritesCategory === "all"
      ? userFavorites
      : userFavorites.filter((quote) => quote.category === favoritesCategory);
  const creationsList =
    creationsCategory === "all"
      ? userCreations
      : userCreations.filter((quote) => quote.category === creationsCategory);

  return (
    <section className="page favorites">
      <nav className="table-view-controls flex-between-center">
        {["favorites", "contributions"].map((view) => (
          <button
            key={view}
            className={`nav-link table-view-btn ${
              tableView === view ? "active" : ""
            }`}
            onClick={() => setTableView(view as TableViewType)}
          >
            {view}
          </button>
        ))}
      </nav>

      <CategorySelect
        searchCategory={
          tableView === "favorites" ? favoritesCategory : creationsCategory
        }
        setSearchCategory={
          tableView === "favorites"
            ? setFavoritesCategory
            : setCreationsCategory
        }
        noSearch={true}
      />

      <FavoritesTable
        favoriteList={tableView === "favorites" ? favoritesList : creationsList}
      />
    </section>
  );
}

export default Favorites;
