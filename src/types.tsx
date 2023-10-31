export interface User {
  id?: number;
  userId: string;
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
  qId: string;
  uId: string;
}
