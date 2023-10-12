import { Favorite, Quote, User } from "./types";

const API_URL = "http://localhost:3000";

export const getAllUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    return response.json();
};

export const addUser = async (user: User) => {
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
    const response = await fetch(`${API_URL}/quotes`);
    return response.json();
};

export const addQuote = async (quote: Quote) => {
    const response = await fetch(`${API_URL}/quoteList`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quote }),
    });
    return response.status;
}

export const deleteQuote = async (id: number) => {
    const response = await fetch(`${API_URL}/quoteList/${id}`, {
        method: "DELETE",
    });
    return response.status;
}

export const getFavoritesByUserId = async (userId: string) => {
    const response = await fetch(`${API_URL}/userFavoriteQuotes/?userId=${userId}`);
    return response.json();
}

export const addFavorite = async (favorite: Favorite) => {
    const response = await fetch(`${API_URL}/userFavoriteQuotes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite }),
    });
    return response.status;
}

export const deleteFavorite = async (id: number) => {
    const response = await fetch(`${API_URL}/userFavoriteQuotes/${id}`, {
        method: "DELETE",
    });
    return response.status;
}

