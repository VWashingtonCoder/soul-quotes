import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Quote, Favorite } from "../types";
import {
  getAllQuotes,
  addToQuotes,
  getAllFavorites,
  addToFavorites,
  deleteFromFavorites,
} from "../api";

interface QuoteState {
  quotes: Quote[];
  favorites: Favorite[];
}

const initialState: QuoteState = {
  quotes: [],
  favorites: [],
};

export const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    getQuotes: (state) => {
      getAllQuotes()
        .then((quotes) => {
          state.quotes = quotes;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addNewQuote: (state, action: PayloadAction<Quote>) => {
      state.quotes.push(action.payload);
      addToQuotes(action.payload)
        .then((status) => {
          if (status === 200) {
            console.log("Quote added successfully");
          } else {
            state.quotes.pop();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFavorites: (state) => {
      getAllFavorites()
        .then((favorites) => {
          state.favorites = favorites;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addNewFavorite: (state, action: PayloadAction<Favorite>) => {
      state.favorites.push(action.payload);
      addToFavorites(action.payload)
        .then((status) => {
          if (status === 200) {
            console.log("Favorite added successfully");
          } else {
            state.favorites.pop();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unfavoriteQuote: (state, action: PayloadAction<number>) => {
        state.favorites = state.favorites.filter(
          (favorite) => favorite.id !== action.payload
        );
        deleteFromFavorites(action.payload)
          .then((status) => {
            if (status === 200) {
              console.log("Favorite deleted successfully");
            } else {
              state.favorites.push(state.favorites[action.payload]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
  },
});

export const {
  getQuotes,
  addNewQuote,
  getFavorites,
  addNewFavorite,
  unfavoriteQuote,
} = quoteSlice.actions;

export const selectQuotes = (state: RootState) => state.quotes.quotes;
export const selectFavorites = (state: RootState) => state.quotes.favorites;

export default quoteSlice.reducer;