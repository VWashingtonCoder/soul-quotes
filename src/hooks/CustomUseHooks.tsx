import { useContext } from "react";
import { AppContext, AppContextType } from "../providers/AppProvider";

export const useAppContext = () => {
  return useContext(AppContext) as AppContextType;
};
