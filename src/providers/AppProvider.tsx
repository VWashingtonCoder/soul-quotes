import { createContext, useState, useEffect } from "react";
import { ChildrenProps, Favorite, Quote, User } from "../types";
import { getFavorites, getQuotes, getUsers, addUser, addFavorite, removeFavorite } from "../api/api-actions";

export type AppContextType = {
  quotes: Quote[] | [];
  userFavoriteQuotes: Quote[] | [];
  users: User[];
  activeUser: User;
  favorites: Favorite[];
  addNewUser: (user: User) => void;
  checkForExistingUserId: (userId: string) => boolean;
  checkForExistingEmail: (email: string) => boolean;
  loginActiveUser: (user: User) => void;
  removeActiveUser: () => void;
  addToFavorites: (quoteId: string) => void;
  removeFromFavorites: (quoteId: string) => void;
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
  const [users, setUsers] = useState([] as User[]);
  const [favorites, setFavorites] = useState([] as Favorite[])
  const [activeUser, setActiveUser] = useState(noUser);
  const [userFavoriteQuotes, setUserFavoriteQuotes] = useState([] as Quote[]);

  // Users
  const checkForExistingLocalUser = () => {
    const localUser = window.localStorage.getItem("activeUser");

    if (localUser) {
      return JSON.parse(localUser);
    } else return null;
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

  const getAllUsers = () => {
    getUsers()
      .then((users) => setUsers(users))
      .catch(err => alert(err));
  };

  const addNewUser = (user: User) => {
    addUser(user)
      .then(() => getAllUsers())
      .catch(err => alert(err));
  };

  const loginActiveUser = (user: User) => {
    setActiveUser(user);
    window.localStorage.setItem("activeUser", JSON.stringify(user));
  };

  const removeActiveUser = () => {
    setActiveUser(noUser);
    window.localStorage.removeItem("activeUser");
  };

  // Favorites
  const updateFavorites = (user: User, quotes: Quote[]) => {
    getFavorites()
      .then((favorites: Favorite[]) => {
        getActiveUserQuotes(favorites, user, quotes);
        setFavorites(favorites);
      })
      .catch(err => alert(err));
  }

  const getActiveUserQuotes = (favorites: Favorite[], user: User, allQuotes: Quote[]) => {
    if (!user.userId) return;

    const userFavorites = favorites.filter(
      (favorite: Favorite) => favorite.uId === user.userId
    );

    const userFavoritesIDs = userFavorites.map((favorite: Favorite) => favorite.qId);

    const userFavoriteQuotes = allQuotes.filter(
      (quote: Quote) => userFavoritesIDs.includes(quote.quoteId)
    );

    setUserFavoriteQuotes(userFavoriteQuotes)
  };

  const addToFavorites = (quoteId: string) => {
    const lastFavoriteId = favorites[favorites.length - 1].id;
    const newFavorite = {
      id: lastFavoriteId + 1,
      uId: activeUser.userId,
      qId: quoteId,
    }
    addFavorite(newFavorite)
      .then(() => {
        updateFavorites(activeUser, quotes);
        alert("Quote added to favorites");
      });
  }

  const removeFromFavorites = (quoteId: string) => {
    console.log("remove");
    const currentIdx = favorites.findIndex((favorite) => favorite.qId === quoteId && favorite.uId === activeUser.userId);
    const currentFavoriteId = favorites[currentIdx].id;

    removeFavorite(currentFavoriteId)
      .then(() => {
        updateFavorites(activeUser, quotes);
        alert("Quote removed from favorites");
      });
  }



  useEffect(() => {
    let user = checkForExistingLocalUser();

    if (user) setActiveUser(user);
    else user = noUser;

    getQuotes().then((quotes) => {
      setQuotes(quotes);
      updateFavorites(user, quotes);
      getAllUsers();
    }).catch(err => alert(err));
  }, []);

  const providerValue = {
    quotes,
    userFavoriteQuotes,
    users,
    activeUser,
    favorites,
    addNewUser,
    checkForExistingEmail,
    checkForExistingUserId,
    loginActiveUser,
    removeActiveUser,
    addToFavorites,
    removeFromFavorites
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
