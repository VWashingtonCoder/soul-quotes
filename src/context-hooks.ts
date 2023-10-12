import { useContext } from "react";
import { UserContext, UserContextType } from "./providers/UserProvider";
import { QuoteContext, QuoteContextType } from "./providers/QuoteProvider";

export const useUser = (): UserContextType => {
  return useContext(UserContext);
};

export const useQuote = (): QuoteContextType => {
  return useContext(QuoteContext);
};
