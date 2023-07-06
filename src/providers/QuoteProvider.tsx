import { createContext, useState, useEffect } from "react";
import { ChildrenProps, Quote } from "../types";
import { getQuotes } from "../api/api-actions";

export type QuoteContextType = {
  quotes: Quote[] | [];
  changeActiveQuotes: (quotesArr: []) => void;
};

export const QuoteContext = createContext<QuoteContextType | object>({});

export const QuoteProvider = ({ children }: ChildrenProps) => {
  const [quotes, setQuotes] = useState([]);


  const changeActiveQuotes = (quotesArr: []) => {
    const quoteOneIdx = Math.floor(Math.random() * quotesArr.length);
    const quoteTwoIdx =
      quoteOneIdx + 10 > quotesArr.length ? quoteOneIdx - 10 : quoteOneIdx + 10;
    const quoteThreeIdx =
      quoteOneIdx + 20 > quotesArr.length ? quoteOneIdx - 20 : quoteOneIdx + 20;
    
  };

  useEffect(() => {
    getQuotes().then((quotes) => {
      setQuotes(quotes);
      changeActiveQuotes(quotes);
    });
  }, []);

  const providerValue = {
    quotes,
    changeActiveQuotes,
  };

  return (
    <QuoteContext.Provider value={providerValue}>
      {children}
    </QuoteContext.Provider>
  );
};
