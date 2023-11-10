import { ReactNode, createContext, useEffect, useState } from "react";
import { Quote } from "../types";
import { getAllQuotes, addQuote, deleteQuote } from "../api";
import { toast } from "react-hot-toast";

export type QuoteContextType = {
  allQuotes: Quote[];
  homeQuotes: Quote[];
  setHomeQuotes: (quotes: Quote[]) => void;
  addNewQuote: (quote: Quote) => void;
  removeQuote: (id: number) => void;
};

export const QuoteContext = createContext({} as QuoteContextType);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [allQuotes, setAllQuotes] = useState<Quote[]>([]);
  const [homeQuotes, setHomeQuotes] = useState([] as Quote[]);

  const getQuotes = async () => {
    const quotesFromServer = await getAllQuotes();
    const randomIndexes = [] as number[];
    while (randomIndexes.length < 3) {
      const randomIndex = Math.floor(Math.random() * quotesFromServer.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    const randomQuotes = randomIndexes.map((index) => quotesFromServer[index]);
    setAllQuotes(quotesFromServer);
    setHomeQuotes(randomQuotes);
  };

  useEffect(() => {
    getQuotes();
  }, []);

  const addNewQuote = async (quote: Quote) => {
    const status = await addQuote(quote);
    if (status === 201) {
      getQuotes();
      toast.success("Quote added successfully!");
    } else toast.error("Error adding quote");
  };

  const removeQuote = async (id: number) => {
    setAllQuotes(allQuotes.filter((quote) => quote.id !== id));
    const status = await deleteQuote(id);
    if (status !== 200) {
      setAllQuotes([...allQuotes]);
      toast.error("Error deleting quote");
    } else toast.success("Quote deleted successfully!");
  };

  return (
    <QuoteContext.Provider
      value={{
        allQuotes,
        homeQuotes,
        setHomeQuotes,
        addNewQuote,
        removeQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};
