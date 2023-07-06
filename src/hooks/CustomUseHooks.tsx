import { useContext } from "react";
import { UserContextType, UserContext } from "../providers/UsersProvider";
import { QuoteContextType, QuoteContext } from "../providers/QuoteProvider";

export const useUserContext = () => {
    return useContext(UserContext) as UserContextType;
}

export const useQuoteContext = () => {
    return useContext(QuoteContext) as QuoteContextType;
}
