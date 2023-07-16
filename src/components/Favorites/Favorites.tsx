import { CategorySelect } from "../CategorySelect/CategorySelect";
import { useQuoteContext, useUserContext } from "../../hooks/CustomUseHooks";
import { useState, useEffect } from "react";
import { Favorite, Quote } from "../../types";

export default function Favorites() {
  const { activeUser } = useUserContext();
  const { userFavoriteQuotes } = useQuoteContext();

  console.log(activeUser);
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
          {/* {favorites.map((favorite) => (
                        <tr key={favorite.id}>
                            <td>{favorite.quote}</td>
                            <td>{favorite.author}</td>
                            <td>{favorite.category}</td>
                            <td>
                                <button onClick={() => handleFavorite(favorite.id)}>Edit</button>
                                <button onClick={() => handleDelete(favorite.id)}>Delete</button>
                            </td>
                        </tr>
                    ))} */}
        </tbody>
      </table>
    </section>
  );
}
