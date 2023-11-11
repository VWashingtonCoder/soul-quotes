import { useState } from "react";
import { useQuote } from "../../context-hooks";
import SelectInput from "../shared/SelectInput";
import QuoteCard from "./QuoteCard";
import "./Home.scss";

function Home() {
  const { allQuotes, homeQuotes, setHomeQuotes } = useQuote();
  const [searchCategory, setSearchCategory] = useState("all");
  const categoryQuotes =
    searchCategory === "all"
      ? allQuotes
      : allQuotes.filter((quote) => quote.category === searchCategory);

  const changeAllHomeQuotes = () => {
    const randomIndexes = [] as number[];
    while (randomIndexes.length < 3) {
      const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    const randomQuotes = randomIndexes.map((index) => categoryQuotes[index]);
    setHomeQuotes(randomQuotes);
  };

  const changeOneHomeQuote = (idx: number) => {
    const possibleQuotes = categoryQuotes.filter(
      (quote) => !homeQuotes.includes(quote)
    );
    const randomIndex = Math.floor(Math.random() * possibleQuotes.length);
    const newHomeQuotes = homeQuotes.map((quote, index) => {
      if (index === idx) {
        return possibleQuotes[randomIndex];
      } else return quote;
    });
    setHomeQuotes(newHomeQuotes);
  };

  return (
    <section className="page home">
      <header>
        <h2 className="title">Welcome to Soul Quotes!</h2>
        <p className="subtitle">
          This is a place to find inspiration and share your own quotes.
        </p>
      </header>

      <div className="category-select">
        <SelectInput
          label="Select a category:"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
        <button
          className="search-btn"
          onClick={(e) => (e.preventDefault(), changeAllHomeQuotes())}
        >
          Search
        </button>
      </div>

      {homeQuotes.length > 0 ? (
        <div className="card-container">
          {homeQuotes.map((quote, idx) => (
            <QuoteCard
              key={quote.quoteId}
              quote={quote}
              idx={idx}
              changeOneHomeQuote={changeOneHomeQuote}
            />
          ))}
        </div>
      ) : (
        <p className="no-quotes">
          Sorry, there are no quotes to display at this time.
        </p>
      )}
    </section>
  );
}

export default Home;
