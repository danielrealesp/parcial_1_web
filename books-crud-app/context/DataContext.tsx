'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book, Author } from '@/lib/types';
import initialData from '@/data/books.json';

interface DataContextType {
  books: Book[];
  authors: Author[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, book: Omit<Book, 'id'>) => void;
  deleteBook: (id: string) => void;
  addAuthor: (author: Omit<Author, 'id'>) => void;
  updateAuthor: (id: string, author: Omit<Author, 'id'>) => void;
  deleteAuthor: (id: string) => void;
  getBookById: (id: string) => Book | undefined;
  getAuthorById: (id: string) => Author | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    setBooks(initialData.books);
    setAuthors(initialData.authors);
  }, []);

  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook = { ...book, id: Date.now().toString() };
    setBooks((prev) => [...prev, newBook]);
  };

  const updateBook = (id: string, book: Omit<Book, 'id'>) => {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...book, id } : b)));
  };

  const deleteBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const addAuthor = (author: Omit<Author, 'id'>) => {
    const newAuthor = { ...author, id: Date.now().toString() };
    setAuthors((prev) => [...prev, newAuthor]);
  };

  const updateAuthor = (id: string, author: Omit<Author, 'id'>) => {
    setAuthors((prev) => prev.map((a) => (a.id === id ? { ...author, id } : a)));
  };

  const deleteAuthor = (id: string) => {
    setAuthors((prev) => prev.filter((a) => a.id !== id));
  };

  const getBookById = (id: string) => books.find((b) => b.id === id);
  const getAuthorById = (id: string) => authors.find((a) => a.id === id);

  return (
    <DataContext.Provider
      value={{
        books,
        authors,
        addBook,
        updateBook,
        deleteBook,
        addAuthor,
        updateAuthor,
        deleteAuthor,
        getBookById,
        getAuthorById,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
