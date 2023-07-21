import { Quote } from "../../types";
import { useAppContext } from "../../hooks/CustomUseHooks";
import { TfiReload } from "react-icons/tfi";
import { BsFillTrashFill } from "react-icons/bs";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

type QuoteCard = {
  quoteId: string;
  quote: string;
  category: string;
  author: string;
  creatorId: string;
}

type QuoteCardProps = {
  quoteData: QuoteCard;
  idx: number;
  changeOne: (idx: number) => void;
};

export default function QuoteCard({
  quoteData,
  idx,
  changeOne,
}: QuoteCardProps) {
  const { quoteId, quote, category, author, creatorId } = quoteData;
  const { activeUser, userFavoriteQuotes, addToFavorites, removeFromFavorites } = useAppContext();
  const { userId } = activeUser;

  const checkFavoriteStatus = () => {
    const favoriteQuoteIds: string[] = [];
    userFavoriteQuotes.map(quote => {
      favoriteQuoteIds.push(quote.quoteId);
    })
    return favoriteQuoteIds.includes(quoteId);
  }

  return (
    <div className="quote-card" key={quoteId}>
      <div className="card-bar flex-align-center">
        <div className="card-bar-left">
          <TfiReload className="icon reload" onClick={() => changeOne(idx)} />
        </div>
        <h2 className="card-bar-center">{category.toUpperCase()}</h2>
        <div className="card-bar-right">
          {userId && checkFavoriteStatus() ? (
            <button 
              className="icon-btn" 
              onClick={(e) => {
                e.preventDefault();
                removeFromFavorites(quoteId)
              }}
            >
              <MdFavorite className="icon favorite" />
            </button>
            
          ) : (
            <button 
              className="icon-btn" 
              onClick={(e) => {
                e.preventDefault();
                addToFavorites(quoteId)
              }}
            >
              <MdFavoriteBorder className="icon unfavorite" />
            </button>
            
          )}
        </div>
      </div>
      <div className="card-body">
        <p className="quote">{quote}</p>
        <p className="author">{author}</p>
      </div>
      {userId === creatorId && <BsFillTrashFill className="icon trash" />}
    </div>
  );
}
