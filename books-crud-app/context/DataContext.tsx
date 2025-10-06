"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Book, Author, ReadingStats, getReadingStatus } from "@/lib/types";

const API_BASE_URL = "http://127.0.0.1:8080/api";

interface DataContextType {
  books: Book[];
  authors: Author[];
  loading: boolean;
  error: string | null;
  readingStats: ReadingStats;
  addBook: (book: Omit<Book, "id">, authorId: number) => void;
  updateBook: (id: number, book: Omit<Book, "id">) => void;
  deleteBook: (id: number) => void;
  addAuthor: (author: Omit<Author, "id" | "books" | "prizes" | "readingProgress">) => void;
  updateAuthor: (
    id: number,
    author: Omit<Author, "id" | "books" | "prizes" | "readingProgress">,
  ) => void;
  updateReadingProgress: (authorId: number, progress: number) => void;
  deleteAuthor: (id: number) => void;
  getBookById: (id: number) => Book | undefined;
  getAuthorById: (id: number) => Author | undefined;
  refreshAuthors: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Flatten books from all authors
  const books = authors.flatMap((author) =>
    author.books.map((book) => ({ ...book })),
  );

  // Calculate reading statistics
  const readingStats: ReadingStats = React.useMemo(() => {
    if (authors.length === 0) {
      return { average: 0, sinIniciar: 0, enCurso: 0, completado: 0 };
    }

    const total = authors.reduce((sum, author) => sum + author.readingProgress, 0);
    const average = total / authors.length;

    const sinIniciar = authors.filter((a) => a.readingProgress === 0).length;
    const completado = authors.filter((a) => a.readingProgress === 100).length;
    const enCurso = authors.filter(
      (a) => a.readingProgress > 0 && a.readingProgress < 100
    ).length;

    return { average, sinIniciar, enCurso, completado };
  }, [authors]);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/authors`);
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      const data = await response.json();
      // Add default readingProgress of 0 to authors from API
      const authorsWithProgress = data.map((author: Author) => ({
        ...author,
        readingProgress: author.readingProgress ?? 0,
      }));
      setAuthors(authorsWithProgress);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch authors");
      console.error("Error fetching authors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const addBook = (book: Omit<Book, "id">, authorId: number) => {
    const newBook = { ...book, id: Date.now() };
    setAuthors((prev) =>
      prev.map((author) =>
        author.id === authorId
          ? { ...author, books: [...author.books, newBook] }
          : author,
      ),
    );
  };

  const updateBook = (id: number, book: Omit<Book, "id">) => {
    setAuthors((prev) =>
      prev.map((author) => ({
        ...author,
        books: author.books.map((b) => (b.id === id ? { ...book, id } : b)),
      })),
    );
  };

  const deleteBook = (id: number) => {
    setAuthors((prev) =>
      prev.map((author) => ({
        ...author,
        books: author.books.filter((b) => b.id !== id),
      })),
    );
  };

  const addAuthor = async (author: Omit<Author, "id" | "books" | "prizes" | "readingProgress">) => {
    const newAuthor = {
      ...author,
      id: Date.now(),
      books: [],
      prizes: [],
      readingProgress: 0,
    };
    setAuthors((prev) => [...prev, newAuthor]);
  };

  const updateAuthor = async (
    id: number,
    author: Omit<Author, "id" | "books" | "prizes" | "readingProgress">,
  ) => {
    setAuthors((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...author } : a)),
    );
  };

  const updateReadingProgress = (authorId: number, progress: number) => {
    setAuthors((prev) =>
      prev.map((a) =>
        a.id === authorId ? { ...a, readingProgress: progress } : a
      )
    );
  };

  const deleteAuthor = (id: number) => {
    setAuthors((prev) => prev.filter((a) => a.id !== id));
  };

  const getBookById = (id: number) => books.find((b) => b.id === id);
  const getAuthorById = (id: number) => authors.find((a) => a.id === id);

  return (
    <DataContext.Provider
      value={{
        books,
        authors,
        loading,
        error,
        readingStats,
        addBook,
        updateBook,
        deleteBook,
        addAuthor,
        updateAuthor,
        updateReadingProgress,
        deleteAuthor,
        getBookById,
        getAuthorById,
        refreshAuthors: fetchAuthors,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
