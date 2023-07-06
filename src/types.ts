export interface User {
  id: number;
  userId: string;
  username: string;
  email: string;
  password: string;
}

export interface Quote {
  id: number;
  quoteId: string;
  quote: string;
  author: string;
  category: string;
  creatorId: string;
}

export interface Favorite {
  id: number;
  userId: string;
  quoteId: string;
}

export interface ChildrenProps {
  children: React.ReactNode;
}