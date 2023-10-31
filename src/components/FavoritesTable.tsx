import { useUser, useQuote } from "../context-hooks";
import { Quote } from "../types";

type FavoritesTableProps = {
  favoriteList: Quote[] | [];
};

const FavoritesTable = ({ favoriteList }: FavoritesTableProps) => {
  const { activeUser, deleteFromFavorites, activeUserFavorites } = useUser();
  const { deleteQuote } = useQuote();
  return (
    <table className="favorites-table">
      <thead>
        <tr>
          <th className="quote-row head">Quote</th>
          <th className="author-row head">Author</th>
          <th className="category-row head">Category</th>
          <th className="actions-row head"></th>
        </tr>
      </thead>
      <tbody>
        {favoriteList.map((quote) => {
          const favoriteId = activeUserFavorites.find(
            (favorite) => favorite.qId === quote.quoteId
          )?.id;
          const isCreator = activeUser?.userId === quote.creatorId;
          return (
            <tr key={quote.id}>
              <td className="quote-row">{quote.quote}</td>
              <td className="author-row">{quote.author}</td>
              <td className="category-row">{quote.category}</td>
              <td className="actions-row">
                {isCreator ? (
                  <button className="btn btn-delete">Delete</button>
                ) : (
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteFromFavorites(favoriteId as number)}
                  >
                    Unfavorite
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default FavoritesTable;
