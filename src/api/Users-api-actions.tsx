import { User } from "../types";

const BASE_URL_USERS = 'http://localhost:3000/users';

export const getUsers = async () => {
    const res = await fetch(BASE_URL_USERS);
    return await res.json();
}

export const addUser = async (newUser: User) => {
    const res = await fetch(BASE_URL_USERS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });
    return await res.json();
}