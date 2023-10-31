import { useUser, useQuote } from "../context-hooks";
import FavoritesTable from "../components/FavoritesTable";

function Favorites() {
  const { activeUser, activeUserFavorites } = useUser();
  const { allQuotes } = useQuote();
  const userFavoritesIds = activeUserFavorites.map((favorite) => favorite.qId);
  const userFavorites = allQuotes.filter((quote) =>
    userFavoritesIds.includes(quote.quoteId)
  );
  const userCreations = allQuotes.filter(
    (quote) => quote.creatorId === activeUser?.userId
  );

  return (
    <>
      <h1>Soul Quotes - Favorites</h1>
      <div className="user-favorites table">
        <h2 className="table-title">Favorites</h2>
        <FavoritesTable favoriteList={userFavorites} />
      </div>

      <div className="user-creation table">
        <h2 className="table-title">Contributions</h2>
        <FavoritesTable favoriteList={userCreations} />
      </div>
    </>
  );
}

export default Favorites;
