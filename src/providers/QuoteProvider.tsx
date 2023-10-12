import { ReactNode, createContext, useEffect, useState } from "react";
import { Quote } from "../types";
import { getAllQuotes, addQuote, deleteQuote } from "../api";

export type QuoteContextType = {
  quotes: Quote[];
  addNewQuote: (quote: Quote) => void;
  removeQuote: (id: number) => void;
};

export const QuoteContext = createContext({} as QuoteContextType);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const getQuotes = async () => {
    const quotesFromServer = await getAllQuotes();
    setQuotes(quotesFromServer);
  };

  useEffect(() => {
    getQuotes();
  }, []);

  const addNewQuote = async (quote: Quote) => {
    setQuotes([...quotes, quote]);
    const status = await addQuote(quote);
    if (status !== 201) {
      setQuotes(quotes.filter((quote) => quote.id !== quote.id));
      alert("Error adding quote");
    } else alert("Quote added successfully!");
  };

  const removeQuote = async (id: number) => {
    setQuotes(quotes.filter((quote) => quote.id !== id));
    const status = await deleteQuote(id);
    if (status !== 200) {
      setQuotes([...quotes]);
      alert("Error deleting quote");
    } else alert("Quote deleted successfully!");
  };

  return (
    <QuoteContext.Provider
      value={{
        quotes,
        addNewQuote,
        removeQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};
