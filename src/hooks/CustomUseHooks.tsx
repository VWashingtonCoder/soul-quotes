import { useContext } from "react";
import { UserContextType, UserContext } from "../providers/UsersProvider";

export const useUserContext = () => {
    return useContext(UserContext) as UserContextType;
}