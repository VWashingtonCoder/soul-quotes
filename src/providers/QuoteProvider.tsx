import { createContext, useState, useEffect } from "react";
import { ChildrenProps, Quote } from "../types";
import { getQuotes } from "../api/Quotes-api-actions";

export type QuoteContextType = {
  quotes: Quote[] | [];
};

export const QuoteContext = createContext<QuoteContextType | object>({});

export const QuoteProvider = ({ children }: ChildrenProps) => {
  const [quotes, setQuotes] = useState([]);


  useEffect(() => {
    getQuotes().then((quotes) => {
      setQuotes(quotes);
    });
  }, []);

  const providerValue = {
    quotes,
  };

  return (
    <QuoteContext.Provider value={providerValue}>
      {children}
    </QuoteContext.Provider>
  );
};
