import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../types";
import { getAllUsers, addToUsers } from "../api";

interface UsersState {
  users: User[];
  activeUser: User | null;
}

const initialState: UsersState = {
  users: [],
  activeUser: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state) => {
        getAllUsers()
            .then((users) => {
            state.users = users;
            })
            .catch((err) => {
            console.log(err);
            });
        }
    ,
    addNewUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      addToUsers(action.payload)
        .then((status) => {
          if (status === 200) {
            console.log("User added successfully");
          } else {
            state.users.pop();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loginUser: (state, action: PayloadAction<User>) => {
        state.activeUser = action.payload;
        window.localStorage.setItem("activeUser", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
        state.activeUser = null;
        window.localStorage.removeItem("activeUser");
    }
  },
});

export const { getUsers, addNewUser, loginUser, logoutUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectActiveUser = (state: RootState) => state.users.activeUser;

export default usersSlice.reducer;