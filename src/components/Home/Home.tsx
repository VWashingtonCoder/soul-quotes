import { useEffect, useState } from "react";
import { useQuoteContext } from "../../hooks/CustomUseHooks";
import { Quote } from "../../types";
import { CategorySelect } from "../CategorySelect/CategorySelect";
import QuoteCard from "../QuoteCard/QuoteCard";
import "./Home.css";

export default function Home() {
  const { quotes } = useQuoteContext();
  const [activeQuotes, setActiveQuotes] = useState({});
  const [searchCategory, setSearchCategory] = useState("all");
  const [searchQuotes, setSearchQuotes] = useState(quotes);
  const activeArray = Object.values(activeQuotes);

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
          your own quotes.
        </p>
      </div>

      <div className="category-search">
        <span className="label-select">Search By Category: </span>
        <CategorySelect update={updateSearchCategory} value={searchCategory} />
        <button className="search-btn" onClick={searchByCategory}>
          Search
        </button>
      </div>

      <div className="active-quotes flex-align-center">
        {Object.values(activeQuotes).map((data, idx) => {
          const quote = data as Quote;
          return (
            <QuoteCard
              key={quote.id}
              quoteData={quote}
              idx={idx}
              changeOne={changeOneActiveQuote}
            />
          );
        })}
      </div>
    </section>
  );
}
