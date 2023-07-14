import { createContext, useState, useEffect } from "react";
import { ChildrenProps, User } from "../types";
import { getUsers, addUser } from "../api/api-actions";

export type UserContextType = {
  users: User[];
  activeUser: User;
  addNewUser: (user: User) => void;
  checkForExistingUserId: (userId: string) => boolean;
  checkForExistingEmail: (email: string) => boolean;
  loginActiveUser: (user: User) => void;
  removeActiveUser: () => void;
};

export const UserContext = createContext<UserContextType | object>({});

const noUser = {
  id: 0,
  userId: "",
  username: "",
  email: "",
  password: "",
};

const testUser = {
  id: 1,
  userId: "testUser3",
  username: "testUser3",
  email: "tu3@ex.com",
  password: "Password3",
};

export const UserProvider = ({ children }: ChildrenProps) => {
  const [users, setUsers] = useState([] as User[]);
  const [activeUser, setActiveUser] = useState(testUser);

  function checkForExistingUserId(userId: string) {
    const existingUser = users.find((u) => u.userId === userId);
    if (existingUser) return true;
    else return false;
  }

  function checkForExistingEmail(email: string) {
    const existingEmail = users.find((u) => u.email === email);
    if (existingEmail) return true;
    else return false;
  }

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
    getAllUsers();
  }, []);

  const providerValue = {
    users,
    activeUser,
    addNewUser,
    checkForExistingEmail,
    checkForExistingUserId,
    loginActiveUser,
    removeActiveUser
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
