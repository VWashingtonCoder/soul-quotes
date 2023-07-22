import { CategorySelect } from "../CategorySelect/CategorySelect";
import { useAppContext } from "../../hooks/CustomUseHooks";
import { MdFavorite } from "react-icons/md";
import { useState } from "react";

export default function Favorites() {
  const {
    activeUser,
    userFavoriteQuotes,
    removeFromFavorites
  } = useAppContext();

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
      <div className="filter search">
        <p className="filter label">Filter By Category</p>
        <CategorySelect update={updateFilterCategory} value={filterCategory} />
      </div>
      <table className="favorites table">
        <thead>
          <tr>
            <th>Quote</th>
            <th>Author</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuotes.length > 0
            ? filteredQuotes.map((favorite) => {
              const { quoteId, quote, author, category, creatorId } = favorite;
              return (
                <tr key={quoteId}>
                  <td>{quote}</td>
                  <td>{author}</td>
                  <td>{category}</td>
                  <td>
                    <button
                      className="btn unfavorite"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromFavorites(quoteId)
                      }}
                    >
                      <MdFavorite className="icon favorite" />
                    </button>
                    {activeUser.userId === creatorId && (
                      <button
                        className="btn trash"
                      // onClick={() => handleDelete(favorite.id)}
                      >
                        Delete
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
