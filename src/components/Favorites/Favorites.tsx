import { useState } from "react";
import { useUser, useQuote } from "../../context-hooks";
import CategorySelect from "../shared/CategorySelect";
import ListTable from "../shared/ListTable";
import "./Favorites.scss";

function Favorites() {
  const { activeUserFavorites } = useUser();
  const { allQuotes } = useQuote();
  const [favoritesCategory, setFavoritesCategory] = useState("all");
  const userFavorites = allQuotes.filter((quote) =>
    activeUserFavorites.map((favorite) => favorite.qId).includes(quote.quoteId)
  );
  const favoritesList =
    favoritesCategory === "all"
      ? userFavorites
      : userFavorites.filter((quote) => quote.category === favoritesCategory);

  return (
    <section className="page favorites">
      <header className="favorites-header">
        View all of your favorite quotes and edit their favorite status or you
        can filter out your favorite quotes by quote category.
      </header>

      <CategorySelect
        searchCategory={favoritesCategory}
        setSearchCategory={setFavoritesCategory}
        noSearch={true}
      />

      <ListTable list={favoritesList} />
    </section>
  );
}

export default Favorites;
