import { useState } from "react";
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
  const { quotes } = useQuote();
  const [searchCategory, setSearchCategory] = useState("all");
  const [homeQuotes, setHomeQuotes] = useState([] as Quote[]);
  const categoryQuotes =
    searchCategory === "all"
      ? quotes
      : quotes.filter((quote) => quote.category === searchCategory);

  const changeAllHomeQuotes = (quotes: Quote[]) => {
    // changes all Home quotes randomly
  };  

  const changeOneHomeQuote = (quote: Quote) => {
    // changes one Home quote randomly
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
          onClick={(e) => (e.preventDefault(), changeAllHomeQuotes(categoryQuotes))}
        >
          Search
        </button>
      </div>
      {quotes.length > 0 ? (
        <div className="card-container">
          {categoryQuotes.map((quote) => {
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
                      e.preventDefault(), console.log("Reload Clicked")
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
