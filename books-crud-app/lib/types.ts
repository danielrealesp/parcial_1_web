export interface Book {
  id: string;
  title: string;
  authorId: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  imageUrl: string;
}

export interface Author {
  id: string;
  name: string;
  country: string;
  birthYear: number;
  imageUrl: string;
}
