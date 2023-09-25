import { createContext, useState, useEffect } from "react";
import { ChildrenProps, Favorite, Quote, User, FormValues } from "../types";
import { addQuote, deleteQuote, getFavorites, getQuotes, getUsers, addUser, addFavorite, removeFavorite } from "../api/api-actions";

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
  addNewQuote: (newQuote: FormValues) => void;
  removeQuote: (quoteId: string) => void;
};

export const AppContext = createContext<AppContextType | object>({});

const noUser = {
  id: 0,
  userId: "",
  username: "",
  email: "",
  password: "",
};

const errorMessage = "Uh-oh...We hit an error...";

export const AppProvider = ({ children }: ChildrenProps) => {
  const [quotes, setQuotes] = useState([] as Quote[]);
  const [users, setUsers] = useState([] as User[]);
  const [favorites, setFavorites] = useState([] as Favorite[])
  const [activeUser, setActiveUser] = useState(noUser);
  const [userFavoriteQuotes, setUserFavoriteQuotes] = useState([] as Quote[]);

  // Users
  const checkForExistingLocalUser = () => {
    const localUser = window.localStorage.getItem("activeUser");

    if (localUser) return JSON.parse(localUser);
    else return null;
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
      .catch(err => {
        console.log(err);
        alert(errorMessage);
      });
  };

  const addNewUser = (user: User) => {
    addUser(user)
      .then(() => getAllUsers())
      .catch(err => {
        console.log(err);
        alert(errorMessage);
      });
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

  const updateFavorites = (user: User, quotes: Quote[]) => {
    getFavorites()
      .then((favorites: Favorite[]) => {
        getActiveUserQuotes(favorites, user, quotes);
        setFavorites(favorites);
      })
      .catch(err => {
        console.log(err);
        alert(errorMessage);
      });
  }

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
    const currentIdx = favorites.findIndex((favorite) => favorite.qId === quoteId && favorite.uId === activeUser.userId);
    const currentFavoriteId = favorites[currentIdx].id;

    removeFavorite(currentFavoriteId)
      .then(() => {
        updateFavorites(activeUser, quotes);
        alert("Quote removed from favorites");
      });
  }

  // Quotes
  const refreshQuotes = () => {
    getQuotes()
      .then((quotes) => setQuotes(quotes))
      .catch(err => {
        console.log(err);
        alert(errorMessage);
      });
  }

  const addNewQuote = (newQuote: FormValues) => {
    const { quote, author, category } = newQuote;
    const categoryQuotes = quotes.filter(quoteData => quoteData.category === category);
    const newQuoteData = {
      id: quotes.length + 1,
      quoteId: `${category}-${categoryQuotes.length + 1}`,
      quote,
      author,
      category,
      creatorId: activeUser.userId
    };

    addQuote(newQuoteData)
      .then((quote) => {
        refreshQuotes()
        alert("Quote added to database");
        addToFavorites(quote.quoteId);
      })
      .catch(err => {
        console.log(err);
        alert(errorMessage);
      });
  }

  const removeQuote = (quoteId: string) => {
    const currentQuote = quotes.find((quote) => quote.quoteId === quoteId);
    const id = currentQuote?.id;
     

    if (id) {
      deleteQuote(id)
        .then(() => {
          refreshQuotes();
          updateFavorites(activeUser, quotes);
          alert("Quote removed from database");
        })
        .catch(err => {
          console.log(err);
          alert(errorMessage);
        });
    }
  }

  useEffect(() => {
    let user = checkForExistingLocalUser();

    if (user && activeUser !== user) setActiveUser(user);
    else user = noUser;

    refreshQuotes();
    getAllUsers();
    updateFavorites(user, quotes);
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
    removeFromFavorites,
    addNewQuote,
    removeQuote
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
