import { createContext, useState, useEffect } from "react";
import { ChildrenProps, User } from "../types";
import { getUsers } from "../api/api-actions";

export type UserContextType = {
  users: User[];
  activeUser: User | object;
  setActiveUser: React.Dispatch<React.SetStateAction<User | object>>;
};

export const UserContext = createContext<UserContextType | object>({});

export const UserProvider = ({ children }: ChildrenProps) => {
  const testUser = {
    id: 0,
    userId: "testUser",
    username: "testUser",
    email: "testuser@ex.com",
    password: "testPassword",
  };
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(testUser);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  const providerValue = {
    users,
    activeUser,
    setActiveUser,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
