import { useQuote, useUser } from "../context-hooks";
import { Quote } from "../types";

type QuoteCardProps = {
  quote: Quote;
  idx: number;
  changeOneHomeQuote: (idx: number) => void;
};

function QuoteCard(props: QuoteCardProps) {
  const { quote, idx, changeOneHomeQuote } = props;
  const {
    activeUser,
    activeUserFavorites,
    addToFavorites,
    deleteFromFavorites,
  } = useUser();
  const { removeQuote } = useQuote();
  const { quoteId, category, author } = quote;
  const text = quote.quote;
  const favoriteCodes = activeUserFavorites.map((favorite) => favorite.quoteId);
  const isFavorite = favoriteCodes.includes(quoteId);
  const favoriteId =
    activeUserFavorites.find((favorite) => favorite.quoteId === quoteId)?.id ||
    0;
  const isCreator = activeUser?.userId === quote.creatorId;

  return (
    <div className="quote-card" key={quoteId}>
      <div className="card-bar flex-between-center">
        <h3 className="card-category">{category}</h3>
        <button
          className="reload-btn"
          onClick={(e) => (e.preventDefault(), changeOneHomeQuote(idx))}
        >
          Reload
        </button>

        {activeUser && (
          <button
            className="favorite-btn"
            onClick={(e) => {
              e.preventDefault();
              isFavorite
                ? deleteFromFavorites(favoriteId)
                : addToFavorites(quoteId);
            }}
          >
            {isFavorite ? "Unfavorite" : "Favorite"}
          </button>
        )}
        {isCreator && (
          <button
            className="delete-btn"
            onClick={(e) => (
              e.preventDefault(), removeQuote(quote.id as number)
            )}
          >
            Delete
          </button>
        )}
      </div>
      <div className="card-body">
        <p className="quote">{text}</p>
        <p className="author">- {author}</p>
      </div>
    </div>
  );
}

export default QuoteCard;
