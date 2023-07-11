import { createContext, useState, useEffect } from "react";
import { ChildrenProps, User } from "../types";
import { getUsers, addUser } from "../api/Users-api-actions";

export type UserContextType = {
  users: User[];
  activeUser: User;
  addNewUser: (user: User) => void;
  checkForExistingUser: (user: User) => boolean;
  removeActiveUser: () => void;
};

export const UserContext = createContext<UserContextType | object>({});

const testUser = {
  id: 0,
  userId: "testUser",
  username: "testUser",
  email: "testuser@ex.com",
  password: "testPassword",
};
const noUser = {
  id: 0,
  userId: "",
  username: "",
  email: "",
  password: "",
};

export const UserProvider = ({ children }: ChildrenProps) => {
  const [users, setUsers] = useState([] as User[]);
  const [activeUser, setActiveUser] = useState(testUser);

  function checkForExistingUser(user: User) {
    const existingUserId = users.find((u) => u.userId === user.userId);
    const existingEmail = users.find((u) => u.email === user.email);
    if (existingUserId || existingEmail) return true;
    else return false;
  }

  const getAllUsers = () => { 
    getUsers().then((users) => setUsers(users)) 
  };

  const addNewUser = (user: User) => {
    console.log("Adding new user");
    console.log(user);
    addUser(user).then(() => getAllUsers());
  };

  const removeActiveUser = () => {
    setActiveUser(noUser);
    window.localStorage.removeItem("activeUser");
  };

  useEffect(() => {
    getAllUsers()
  }, []);

  const providerValue = {
    users,
    activeUser,
    addNewUser,
    checkForExistingUser,
    removeActiveUser,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
