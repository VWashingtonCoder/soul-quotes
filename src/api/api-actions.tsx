const BASE_URL = 'http://localhost:3000';

export const getUsers = async () => {
    const res = await fetch(`${BASE_URL}/users`);
    return await res.json();
}
