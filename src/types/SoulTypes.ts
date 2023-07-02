interface User {
    id: number;
    userId: string;
    username: string;
    email: string;
    password: string;
}

interface Quote {
    id: number;
    quoteId: string;
    quote: string;
    author: string;
    category: string;
    creatorId: string;
}

interface Favorite {
    id: number;
    userId: string;
    quoteId: string;
}

