import { useState } from "react";
import { CategorySelect } from "../CategorySelect/CategorySelect";
import { useAppContext } from "../../hooks/CustomUseHooks";
import { MdFavorite } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import "./Favorites.css";

export default function Favorites() {
  const { activeUser, userFavoriteQuotes, removeFromFavorites, removeQuote } = useAppContext();
  const [filterCategory, setFilterCategory] = useState("all");
  const filteredQuotes = userFavoriteQuotes.filter(quote => {
    if (filterCategory === "all") {
      return true;
    } else {
      return quote.category === filterCategory;
    }
  });

  const updateFilterCategory = (e: { target: { value: string } }) => {
    setFilterCategory(e.target.value);
  }

  return (
    <section className="page favorites">
      <h2 className="page-title">Favorite Quotes</h2>
      <div className="filter-search flex-align-center">
        <span className="filter-label">Filter By Category: </span>
        <CategorySelect update={updateFilterCategory} value={filterCategory} />
      </div>
      <table className="favorites-table">
        <thead>
          <tr>
            <th className="quote-col head">Quote</th>
            <th className="author-col head">Author</th>
            <th className="category-col head">Category</th>
            <th className="actions-col head">Action(s)</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuotes.length > 0
            ? filteredQuotes.map((favorite) => {
              const { quoteId, quote, author, category, creatorId } = favorite;
              return (
                <tr key={quoteId}>
                  <td className="quote-col cell">{quote}</td>
                  <td className="author-col cell">{author}</td>
                  <td className="category-col cell">{category}</td>
                  <td className="actions-col cell">
                    <button
                      className="icon-btn unfavorite"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromFavorites(quoteId)
                      }}
                    >
                      <MdFavorite className="icon favorite" />
                    </button>
                    {activeUser.userId === creatorId && (
                      <button
                        className="icon-btn trash"
                      onClick={() => removeQuote(quoteId)}
                      >
                        <BsFillTrashFill className="icon trash" />
                      </button>
                    )}
                  </td>
                </tr>
              )
            })
            : (
              <tr>
                <td colSpan={4} className="no-favorites">
                  No Favorites In This Category🙁
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </section>
  );
}
