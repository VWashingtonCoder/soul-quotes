import { useEffect, useState } from "react";
import { useQuote, useUser } from "../context-hooks";
import { Quote } from "../types";

const categories = [
  { key: "all", label: "All Categories" },
  { key: "inspirational", label: "Inspirational" },
  { key: "love", label: "Love/Relationships" },
  { key: "philosophy", label: "Philosophy" },
  { key: "success", label: "Career/Success" },
  { key: "funny", label: "Funny" },
];

function Home() {
  const { activeUser, activeUserFavorites } = useUser();
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
    const possibleQuotes = categoryQuotes.filter((quote) => !homeQuotes.includes(quote));
    const randomIndex = Math.floor(Math.random() * possibleQuotes.length);
    const newHomeQuotes = homeQuotes.map((quote, index) => {
      if(index === idx) {
        return possibleQuotes[randomIndex];
      } else return quote;
    });
    setHomeQuotes(newHomeQuotes);
  };


  return (
    <section className="page home">
      <header>
        Welcome to Soul Quotes! This is a place to find inspiration and share
        your own quotes.
      </header>

      <div className="category-select">
        <label htmlFor="category">Select a category:</label>
        <select
          name="category"
          onChange={(e) => setSearchCategory(e.target.value)}
          value={searchCategory}
        >
          {categories.map((category) => (
            <option key={category.key} value={category.key}>
              {category.label}
            </option>
          ))}
        </select>
        <button
          className="search-btn"
          onClick={(e) => (e.preventDefault(), changeAllHomeQuotes())}
        >
          Search
        </button>
      </div>
      {homeQuotes.length > 0 ? (
        <div className="card-container">
          {homeQuotes.map((quote, idx) => {
            const { quoteId, category, author } = quote;
            const text = quote.quote;
            const isFavorite = activeUserFavorites.includes(quoteId);
            const isCreator = activeUser?.userId === quote.creatorId;

            return (
              <div className="quote-card" key={quoteId}>
                <div className="card-bar flex-between-center">
                  <h3 className="card-category">{category}</h3>
                  <button
                    className="reload-btn"
                    onClick={(e) => (
                      e.preventDefault(), changeOneHomeQuote(idx)
                    )}
                  >
                    Reload
                  </button>
                  
                  {activeUser && (
                    <button
                      className="favorite-btn"
                      onClick={(e) => (
                        e.preventDefault(), console.log("Favorite Clicked")
                      )}
                    >
                      {isFavorite ? "Unfavorite" : "Favorite"}
                    </button>
                  )}
                  {isCreator && (
                    <button
                      className="delete-btn"
                      onClick={(e) => (
                        e.preventDefault(), console.log("Delete Clicked")
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
          })}
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
