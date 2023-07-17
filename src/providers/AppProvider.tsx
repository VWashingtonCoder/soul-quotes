import { createContext, useState, useEffect } from "react";
import { ChildrenProps, Favorite, Quote, User } from "../types";
import { getFavorites, getQuotes, getUsers, addUser } from "../api/api-actions";

export type AppContextType = {
  quotes: Quote[] | [];
  userFavoriteQuotes: Quote[] | [];
  users: User[];
  activeUser: User;
  addNewUser: (user: User) => void;
  checkForExistingUserId: (userId: string) => boolean;
  checkForExistingEmail: (email: string) => boolean;
  loginActiveUser: (user: User) => void;
  removeActiveUser: () => void;
};

export const AppContext = createContext<AppContextType | object>({});

const noUser = {
  id: 0,
  userId: "",
  username: "",
  email: "",
  password: "",
};

export const AppProvider = ({ children }: ChildrenProps) => {
  const [quotes, setQuotes] = useState([] as Quote[]);
  const [userFavoriteQuotes, setUserFavoriteQuotes] = useState([] as Quote[]);
  const [users, setUsers] = useState([] as User[]);
  const [activeUser, setActiveUser] = useState(noUser);

  const checkForExistingLocalUser = () => {
    const localUser = window.localStorage.getItem("activeUser");

    if (localUser) {
      setActiveUser(JSON.parse(localUser));
      return true;
    } else return false;
  };

  const checkForExistingUserId = (userId: string) => {
    const existingUser = users.find((u) => u.userId === userId);
    if (existingUser) return true;
    else return false;
  };

  const checkForExistingEmail = (email: string) => {
    const existingEmail = users.find((u) => u.email === email);
    if (existingEmail) return true;
    else return false;
  };

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

  const getAllUsers = () => {
    getUsers().then((users) => setUsers(users));
  };

  const addNewUser = (user: User) => {
    addUser(user).then(() => getAllUsers());
  };

  const loginActiveUser = (user: User) => {
    setActiveUser(user);
    window.localStorage.setItem("activeUser", JSON.stringify(user));
  };

  const removeActiveUser = () => {
    setActiveUser(noUser);
    window.localStorage.removeItem("activeUser");
  };

  useEffect(() => {
    getQuotes().then((quotes) => {
      setQuotes(quotes);
    });

    getAllUsers();

    if (checkForExistingLocalUser()) {
      getFavorites().then((favorites) => {
        getActiveUserQuotes(favorites);
      });
    }
  }, []);

  const providerValue = {
    quotes,
    userFavoriteQuotes,
    users,
    activeUser,
    addNewUser,
    checkForExistingEmail,
    checkForExistingUserId,
    loginActiveUser,
    removeActiveUser,
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
