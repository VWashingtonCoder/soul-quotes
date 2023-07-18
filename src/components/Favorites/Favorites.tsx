import { CategorySelect } from "../CategorySelect/CategorySelect";
import { useAppContext } from "../../hooks/CustomUseHooks";
import { useState, useEffect } from "react";
import { Favorite, Quote } from "../../types";

export default function Favorites() {
  const { activeUser, userFavoriteQuotes } = useAppContext();
  console.log(userFavoriteQuotes);



  return (
    <section className="page favorites">
      <div className="filter search">
        <p className="filter label">Filter By Category</p>
        {/* <CategorySelect /> */}
        <select name="" id="">
          <option value="">All</option>
        </select>
        <button>Filter</button>
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
          {userFavoriteQuotes.map((favorite) => {
            const { quoteId, quote, author, category, creatorId } = favorite;
            return (
              <tr key={quoteId}>
                <td>{quote}</td>
                <td>{author}</td>
                <td>{category}</td>
                <td>
                  <button
                    className="btn unfavorite" 
                    // onClick={() => handleFavorite(favorite.id)}
                  >
                    Edit
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
          })}
        </tbody>
      </table>
    </section>
  );
}
