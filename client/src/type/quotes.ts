export interface Quote {
  id: number;
  quote: string;
  author: string;
}

export const staticQuotes: Quote[] = [
  {
    id: 1,
    quote:
      "The only limit to our realization of tomorrow will be our doubts of today",
    author: "Franklin D. Roosevelt",
  },
  {
    id: 2,
    quote: "The only way to do great work is to love what you do",
    author: "Steve Jobs",
  },
];
