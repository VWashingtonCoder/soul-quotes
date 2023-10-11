export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
}

export interface Quote {
  id?: number;
  quoteId: string;
  quote: string;
  author: string;
  category: string;
  creatorId: string;
}

export interface Favorite {
  id?: number;
  quoteId: string;
  userId: string;
}
