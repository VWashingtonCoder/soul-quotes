import { useEffect, useState } from "react";
import { useQuoteContext, useUserContext } from "../../hooks/CustomUseHooks";
import { TfiReload } from "react-icons/tfi";
import { BsFillTrashFill } from "react-icons/bs";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Quote } from "../../types";

function getRandomQuote(quotesArr: [] | Quote[]) {
  const quoteIdx = Math.floor(Math.random() * quotesArr.length);
  return quotesArr[quoteIdx];
}

export default function Home() {
  const { quotes } = useQuoteContext();
  const { userId } = useUserContext().activeUser;
  const [activeQuotes, setActiveQuotes] = useState({});

  useEffect(() => {
    if (quotes.length > 0) {
      setActiveQuotes({
        quoteOne: getRandomQuote(quotes),
        quoteTwo: getRandomQuote(quotes),
        quoteThree: getRandomQuote(quotes),
      });
    }
  }, [quotes]);

  const activeQuotesArray = Object.values(activeQuotes);

  const changeActiveQuotes = (idx: number) => {
    switch (idx) {
      case 0:
        setActiveQuotes({ ...activeQuotes, quoteOne: getRandomQuote(quotes) });
        break;
      case 1:
        setActiveQuotes({ ...activeQuotes, quoteTwo: getRandomQuote(quotes) });
        break;
      case 2:
        setActiveQuotes({
          ...activeQuotes,
          quoteThree: getRandomQuote(quotes),
        });
        break;
      default:
        break;
    }
  };

  return (
    <section className="home page">
        <div className="home-header">
            <p>
                Welcome to Soul Quotes! This is a place to find inspiration and share your own quotes. You can browse quotes randomly  by clicking the reload circle or by category from the dropdown list below. You can also use your account to save your favorite quotes and/or create your own. If you don't have an account, you can create one by visiting the "Account" page from the link in the top right corner. Enjoy!
            </p>
        </div>

        <div className="category-search">
            <span className="label select">Search By Category: </span>
            <select name="category" id="category"> 
                <option value="">Select A Category</option>
            </select>
        </div>

      <div className="active-quotes flex-align-center">
        {activeQuotesArray.map((quoteData, idx) => {
          const { author, category, creatorId, quote, quoteId } =
            quoteData as Quote;
          const favorite = false;
          return (
            <div key={quoteId} className="quote-card">
              <div className="card-bar flex-align-center">
                <div className="card-bar-left">
                  <TfiReload
                    className="icon reload"
                    onClick={() => changeActiveQuotes(idx)}
                  />
                </div>
                <h2>{category.toUpperCase()}</h2>
                <div className="card-bar-right">
                  {favorite ? (
                    <MdFavorite className="icon favorite" />
                  ) : (
                    <MdFavoriteBorder className="icon unfavorite" />
                  )}
                  {userId === creatorId && (
                    <BsFillTrashFill className="icon trash" />
                  )}
                </div>
              </div>
              <div className="card-body">
                <p>{quote}</p>
                <p>{author}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
