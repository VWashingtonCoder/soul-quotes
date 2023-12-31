import { ReactNode, createContext, useEffect, useState } from "react";
import { User, Favorite } from "../types";
import {
  getAllUsers,
  addUser,
  getFavoritesByUserId,
  addFavorite,
  deleteFavorite,
} from "../api";
import { toast } from "react-hot-toast";

export type UserContextType = {
  users: User[];
  activeUser: User | null;
  activeUserFavorites: Favorite[];
  loginActiveUser: (user: User) => void;
  logoutActiveUser: () => void;
  addNewUser: (user: User) => void;
  addToFavorites: (quoteId: string) => void;
  deleteFromFavorites: (id: number) => void;
};

export const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [activeUserFavorites, setActiveUserFavorites] = useState<Favorite[]>(
    []
  );

  const getUsers = async () => {
    const usersFromServer = await getAllUsers();
    setUsers(usersFromServer);
  };

  const getFavorites = async (userId: string) => {
    const favoritesFromServer = await getFavoritesByUserId(userId);
    setActiveUserFavorites(favoritesFromServer);
  };

  const checkForLocalUser = () => {
    const localUser = localStorage.getItem("activeUser");
    if (localUser) {
      setActiveUser(JSON.parse(localUser));
      getFavorites(JSON.parse(localUser).userId);
    }
  };

  useEffect(() => {
    getUsers();
    checkForLocalUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginActiveUser = (user: User) => {
    localStorage.setItem("activeUser", JSON.stringify(user));
    setActiveUser(user);
    getFavorites(user.userId);
    window.location.href = "/";
  };

  const logoutActiveUser = () => {
    localStorage.removeItem("activeUser");
    setActiveUser(null);
    setActiveUserFavorites([]);
  };

  const addNewUser = async (newUser: User) => {
    setUsers([...users, newUser]);
    const status = await addUser(newUser);
    if (status !== 201) {
      setUsers(users.filter((user) => user.userId !== newUser.userId));
      toast.error("Something went wrong. Please try again.");
    } else {
      loginActiveUser(newUser);
      toast.success("Account created successfully!");
    }
  };

  const addToFavorites = async (quoteId: string) => {
    const userId = activeUser ? activeUser.userId : "";
    const newFavorite = {
      uId: userId,
      qId: quoteId,
    };

    const status = await addFavorite(newFavorite);

    if (status === 201) getFavorites(userId);
    else toast.error("Error adding favorite")
  };

  const deleteFromFavorites = async (id: number) => {
    const userId = activeUser ? activeUser.userId : "";
    const status = await deleteFavorite(id);

    if (status === 200) {
      getFavorites(userId);
    }
  };

  const providerValue = {
    users,
    activeUser,
    activeUserFavorites,
    loginActiveUser,
    logoutActiveUser,
    addNewUser,
    addToFavorites,
    deleteFromFavorites,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
