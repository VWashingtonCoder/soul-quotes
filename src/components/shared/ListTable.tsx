import { useUser, useQuote } from "../../context-hooks";
import { Quote } from "../../types";
import { AiFillHeart, AiFillDelete } from "react-icons/ai";

type ListTableProps = {
  list: Quote[] | [];
};

const ListTable = ({ list }: ListTableProps) => {
  const { activeUser, deleteFromFavorites, activeUserFavorites } = useUser();
  const { allQuotes, removeQuote } = useQuote();

  console.log(activeUserFavorites);

  const handleDelete = (quoteId: string, favoriteId: number) => {
    const quoteToDelete = allQuotes.find((quote) => quote.quoteId === quoteId);
    if (quoteToDelete) {
      removeQuote(quoteToDelete.id as number);
    }
    deleteFromFavorites(favoriteId as number);
  };

  return (
    <table className="list-table">
      <thead>
        <tr>
          <th className="quote cell head">Quote</th>
          <th className="author cell head">Author</th>
          <th className="category cell head">Category</th>
          <th className="actions cell head"></th>
        </tr>
      </thead>
      <tbody>
        {list.length === 0 && (
          <tr>
            <td className="no-quote cell" colSpan={4}>
              No quotes to display.
            </td>
          </tr>
        )}

        {list.map((quote) => {
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
                    onClick={() =>
                      handleDelete(quote.quoteId, favoriteId as number)
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

export default ListTable;
