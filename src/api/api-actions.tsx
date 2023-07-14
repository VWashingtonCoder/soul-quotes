import { Favorite, Quote, User } from "../types";

const BASE_URL = "http://localhost:3000";

// FAVORITES
export const getFavorites = async () => {
    const res = await fetch(`${BASE_URL}/favorites`);
    return res.json();
}

export const addFavorite = async (favorite: Favorite) => {
    const res = await fetch(`${BASE_URL}/favorites`, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(favorite)
    });
    return res.json();
}

// QUOTES
export const getQuotes = async () => {
  const res = await fetch(`${BASE_URL}/quotes`);
  return res.json();
};

// USERS
export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return await res.json();
};

export const addUser = async (newUser: User) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  return await res.json();
};
