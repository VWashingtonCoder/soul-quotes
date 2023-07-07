import { useEffect, useState } from "react";
import { useQuoteContext, useUserContext } from "../../hooks/CustomUseHooks";
import { TfiReload } from "react-icons/tfi";
import { BsFillTrashFill } from "react-icons/bs";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Quote } from "../../types";
import { CategorySelect } from "../CategorySelect/CategorySelect";

export default function Home() {
  const { quotes } = useQuoteContext();
  const { userId } = useUserContext().activeUser;
  const [activeQuotes, setActiveQuotes] = useState({});
  const [searchCategory, setSearchCategory] = useState("all");
  const [searchQuotes, setSearchQuotes] = useState(quotes);

  const changeAllActiveQuotes = (quoteArray: Quote[]) => {
    const randomIndexes: number[] = [];
    while (randomIndexes.length < 3) {
      const randomIdx = Math.floor(Math.random() * quoteArray.length);
      if (!randomIndexes.includes(randomIdx)) randomIndexes.push(randomIdx);
    }
    const [idxOne, idxTwo, idxThree] = randomIndexes;
    setActiveQuotes({
      quoteOne: quoteArray[idxOne],
      quoteTwo: quoteArray[idxTwo],
      quoteThree: quoteArray[idxThree],
    });
  };

  const changeOneActiveQuote = (idx: number) => {
    const activeArray = Object.values(activeQuotes);
    const possibleQuotes = searchQuotes.filter(
      (quote) => !activeArray.includes(quote)
    );
    const randomQuote =
      possibleQuotes[Math.floor(Math.random() * possibleQuotes.length)];
    const name = idx === 0 ? "quoteOne" : idx === 1 ? "quoteTwo" : "quoteThree";

    setActiveQuotes({ ...activeQuotes, [name]: randomQuote });
  };

  const searchByCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const categoryQuotes =
      searchCategory === "all"
        ? quotes
        : quotes.filter((quote) => quote.category === searchCategory);
    e.preventDefault();
    changeAllActiveQuotes(categoryQuotes);
    setSearchQuotes(categoryQuotes);
  };

  const updateSearchCategory = (e: { target: { value: string } }) => {
    setSearchCategory(e.target.value);
  };

  useEffect(() => {
    if (quotes.length > 0) changeAllActiveQuotes(quotes);
  }, [quotes]);

  return (
    <section className="home page">
      <div className="home-header">
        <p>
          Welcome to Soul Quotes! This is a place to find inspiration and share
          your own quotes. You can browse quotes randomly by clicking the reload
          circle or by category from the dropdown list below. You can also use
          your account to save your favorite quotes and/or create your own. If
          you don't have an account, you can create one by visiting the
          "Account" page from the link in the top right corner. Enjoy!
        </p>
      </div>

      <div className="category-search">
        <span className="label select">Search By Category: </span>
        <CategorySelect update={updateSearchCategory} value={searchCategory} />
        <button onClick={searchByCategory}>Search</button>
      </div>

      <div className="active-quotes flex-align-center">
        {Object.values(activeQuotes).map((quoteData, idx) => {
          const { author, category, creatorId, quote, quoteId } =
            quoteData as Quote;
          const favorite = false;
          return (
            <div key={quoteId} className="quote-card">
              <div className="card-bar flex-align-center">
                <div className="card-bar-left">
                  <TfiReload
                    className="icon reload"
                    onClick={() => changeOneActiveQuote(idx)}
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
