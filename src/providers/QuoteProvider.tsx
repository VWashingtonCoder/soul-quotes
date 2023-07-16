import { createContext, useState, useEffect } from "react";
import { ChildrenProps, Favorite, Quote } from "../types";
import { getFavorites, getQuotes } from "../api/api-actions";
import { useUserContext } from "../hooks/CustomUseHooks";

export type QuoteContextType = {
  quotes: Quote[] | [];
  userFavoriteQuotes: Quote[] | [];
};

export const QuoteContext = createContext<QuoteContextType | object>({});

export const QuoteProvider = ({ children }: ChildrenProps) => {
  const [quotes, setQuotes] = useState([] as Quote[]);
  const [userFavoriteQuotes, setUserFavoriteQuotes] = useState([] as Quote[]);
  const { activeUser } = useUserContext();

  const getActiveUserQuotes = (favorites: Favorite[]) => {
    const activeUserQuoteIds = [] as string[];
    const activeUserFavorites = favorites.filter(
      (favorite: Favorite) => favorite.userId === activeUser.userId
    );

    activeUserFavorites.forEach((favorite: Favorite) =>
      activeUserQuoteIds.push(favorite.quoteId)
    );

    const activeUserFavoriteQuotes = quotes.filter((quote: Quote) =>
      activeUserQuoteIds.includes(quote.quoteId)
    );

    setUserFavoriteQuotes(activeUserFavoriteQuotes);
  };

  useEffect(() => {
    getQuotes().then((quotes) => {
      setQuotes(quotes);
    });

    if (activeUser.userId) {
      getFavorites().then((favorites) => {
        getActiveUserQuotes(favorites);
      });
    }
  }, []);

  const providerValue = {
    quotes,
    userFavoriteQuotes,
  };

  return (
    <QuoteContext.Provider value={providerValue}>
      {children}
    </QuoteContext.Provider>
  );
};
