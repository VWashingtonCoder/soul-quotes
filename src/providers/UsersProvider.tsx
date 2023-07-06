import { createContext, useState, useEffect } from "react";
import { ChildrenProps, User } from "../types";
import { getUsers } from "../api/api-actions";

export type UserContextType = {
  users: User[];
  activeUser: User;
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
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(testUser);

  const removeActiveUser = () => {
    setActiveUser(noUser);
  };

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  const providerValue = {
    users,
    activeUser,
    removeActiveUser,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
