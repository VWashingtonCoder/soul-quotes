import { createContext, useState, useEffect } from "react";
import { ChildrenProps, Favorite, Quote } from "../types";
import { getFavorites, getQuotes } from "../api/api-actions";

export type QuoteContextType = {
  quotes: Quote[] | [];
  favoriteQuotes: Favorite[] | [];
  activeUserLocal: string | "";
};

export const QuoteContext = createContext<QuoteContextType | object>({});

export const QuoteProvider = ({ children }: ChildrenProps) => {
  const [quotes, setQuotes] = useState([]);
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);

  const activeUserLocal = window.localStorage.getItem("activeUser");

  useEffect(() => {
    getQuotes().then((quotes) => {
      setQuotes(quotes);
    });

    getFavorites().then((favorites) => {
        setFavoriteQuotes(favorites);
    });
  }, []);

  const providerValue = {
    quotes,
    favoriteQuotes
  };

  return (
    <QuoteContext.Provider value={providerValue}>
      {children}
    </QuoteContext.Provider>
  );
};
