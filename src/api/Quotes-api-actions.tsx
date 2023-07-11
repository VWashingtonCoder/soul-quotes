const BASE_URL_QUOTES = 'http://localhost:3000/quotes';

export const getQuotes = async () => {
    const res = await fetch(BASE_URL_QUOTES);
    return res.json();
}

