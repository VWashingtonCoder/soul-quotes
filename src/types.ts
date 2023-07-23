export interface User {
  ["userId"]: string;
  username: string;
  email: string;
  password: string;
}

export interface Quote {
  quoteId: string;
  quote: string;
  author: string;
  category: string;
  creatorId: string;
}

export interface Favorite {
  ["id"]: number;
  uId: string;
  qId: string;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export type FormValues = {
  ["quote"]: string;
  author: string;
  category: string;
}

export interface FormValuesErrors {
  [key: string]: string;
}
