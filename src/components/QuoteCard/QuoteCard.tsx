import { Quote } from "../../types";
import { useAppContext } from "../../hooks/CustomUseHooks";
import { TfiReload } from "react-icons/tfi";
import { BsFillTrashFill } from "react-icons/bs";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

type QuoteCardProps = {
  quoteData: Quote;
  idx: number;
  changeOne: (idx: number) => void;
};

export default function QuoteCard({
  quoteData,
  idx,
  changeOne,
}: QuoteCardProps) {
  const { quoteId, quote, category, author, creatorId } = quoteData;
  const { userId } = useAppContext().activeUser;
  const favorite = false;
  return (
    <div className="quote-card" key={quoteId}>
      <div className="card-bar flex-align-center">
        <div className="card-bar-left">
          <TfiReload className="icon reload" onClick={() => changeOne(idx)} />
        </div>
        <h2 className="card-bar-center">{category.toUpperCase()}</h2>
        <div className="card-bar-right">
          {favorite ? (
            <MdFavorite className="icon favorite" />
          ) : (
            <MdFavoriteBorder className="icon unfavorite" />
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
