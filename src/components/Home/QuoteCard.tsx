import { useQuote, useUser } from "../../context-hooks";
import { Quote } from "../../types";
import { TfiReload } from "react-icons/tfi";
import { AiFillHeart, AiOutlineHeart, AiFillDelete } from "react-icons/ai";

type QuoteCardProps = {
  quote: Quote;
  idx: number;
  changeOneHomeQuote: (idx: number) => void;
};

const QuoteCard = (props: QuoteCardProps) => {
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
  const favoriteCodes = activeUserFavorites.map((favorite) => favorite.qId);
  const isFavorite = favoriteCodes.includes(quoteId);
  const favoriteId =
    activeUserFavorites.find((favorite) => favorite.qId === quoteId)?.id || 0;
  const isCreator = activeUser?.userId === quote.creatorId;

  const handleQuoteDelete = (id: number) => {
    removeQuote(id)
    changeOneHomeQuote(idx)
  };

  return (
    <div className="quote-card" key={quoteId}>
      <div className="card-bar flex-between-center">
        <h3 className="card-category">{category}</h3>
        <button
          className="card-btn reload"
          onClick={(e) => (e.preventDefault(), changeOneHomeQuote(idx))}
        >
          <TfiReload />
        </button>

        {activeUser && (
          <button
            className="card-btn favorite"
            onClick={(e) => {
              e.preventDefault();
              isFavorite
                ? deleteFromFavorites(favoriteId)
                : addToFavorites(quoteId);
            }}
          >
            {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        )}
        {isCreator && (
          <button
            className="card-btn delete"
            onClick={(e) => (
              e.preventDefault(), handleQuoteDelete(quote.id as number)
            )}
          >
            <AiFillDelete />
          </button>
        )}
      </div>
      <div className="card-body">
        <p className="card-content quote">{text}</p>
        <p className="card-content author">- {author}</p>
      </div>
    </div>
  );
};

export default QuoteCard;
