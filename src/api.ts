import { User, Quote, Favorite } from "./types";

const API_URL = "http://localhost:3000";

export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
};

export const addToUsers = async (user: User) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.status;
};

export const getAllQuotes = async () => {
  const response = await fetch(`${API_URL}/quoteList`);
  return response.json();
};

export const addToQuotes = async (quote: Quote) => {
  const response = await fetch(`${API_URL}/quoteList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quote),
  });
  return response.json();
};

export const getAllFavorites = async () => {
  const response = await fetch(`${API_URL}/favorites`);
  return response.json();
};

export const addToFavorites = async (favorite: Favorite) => {
  const response = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favorite),
  });
  return response.json();
};

export const deleteFromFavorites = async (id: number) => {
  const response = await fetch(`${API_URL}/favorites/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
