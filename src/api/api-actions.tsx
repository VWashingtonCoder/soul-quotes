import { Favorite, Quote, User } from "../types";

const BASE_URL = "http://localhost:3000";

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

// QUOTES
export const getQuotes = async () => {
  const res = await fetch(`${BASE_URL}/quoteList`);
  return res.json();
};

export const addQuote = async(quote: Quote) => {
  const res = await fetch(`${BASE_URL}/quoteList`, {
    method: 'POST',
    headers: {
        'Content-type': 'Application/json'
    },
    body: JSON.stringify(quote)
  });
  return res.json();
}

export const deleteQuote = async(id: number) => {
  const res = await fetch(`${BASE_URL}/quoteList/${id}`, { method: 'DELETE' });
  return res.json();
}

// FAVORITES
export const getFavorites = async () => {
    const res = await fetch(`${BASE_URL}/userFavorites`);
    return res.json();
}

export const addFavorite = async (favorite: Favorite) => {
    const res = await fetch(`${BASE_URL}/userFavorites`, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(favorite)
    });
    return res.json();
}

export const removeFavorite = async(id: number) => {
  const res = await fetch(`${BASE_URL}/userFavorites/${id}`, { method: 'DELETE' });
  return res.json();
}

