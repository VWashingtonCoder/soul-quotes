import { useUser, useQuote } from "../../context-hooks";
import { Quote } from "../../types";
import { AiFillHeart, AiFillDelete } from "react-icons/ai";

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
          <th className="quote cell head">Quote</th>
          <th className="author cell head">Author</th>
          <th className="category cell head">Category</th>
          <th className="actions cell head"></th>
        </tr>
      </thead>
      <tbody>
        {favoriteList.length === 0 && (
          <tr>
            <td className="no-quote cell" colSpan={4}>
              No quotes to display.
            </td>
          </tr>
        )}

        {favoriteList.map((quote) => {
          const favoriteId = activeUserFavorites.find(
            (favorite) => favorite.qId === quote.quoteId
          )?.id;
          const isCreator = activeUser?.userId === quote.creatorId;
          return (
            <tr key={quote.id}>
              <td className="quote cell">{quote.quote}</td>
              <td className="author cell">{quote.author}</td>
              <td className="category cell">{quote.category}</td>
              <td className="actions cell">
                {isCreator ? (
                  <AiFillDelete
                    className="table-btn delete"
                    onClick={
                      () => console.log("delete")
                      // deleteQuote(quote.id as number)
                    }
                  />
                ) : (
                  <AiFillHeart
                    className="table-btn unfavorite"
                    onClick={() => deleteFromFavorites(favoriteId as number)}
                  />
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
