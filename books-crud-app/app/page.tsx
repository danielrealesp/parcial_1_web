"use client";

import { useData } from "@/context/DataContext";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { books, authors, deleteBook } = useData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
            Libros
          </h1>
          <p className="mt-1 text-base text-gray-500">
            Descubre y gestiona tu colección
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-3">
          <Link
            href="/books/new"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-400 shadow transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            + Agregar Nuevo Libro
          </Link>
          <Link
            href="/authors"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold bg-white text-gray-900 border border-gray-300 shadow transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Gestionar Autores
          </Link>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {books.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow">
            <p className="text-lg text-gray-500">
              No se encontraron libros. ¡Agrega tu primer libro!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => {
              const author = authors.find(a => a.books.some(b => b.id === book.id));
              return (
                <div
                  key={book.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                >
                  {/* Book Cover */}
                  <Image
                    src={book.image}
                    alt={book.name}
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover"
                    unoptimized
                  />

                  {/* Book Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-1 text-gray-900">
                      {book.name}
                    </h3>
                    <p className="text-sm mb-1 text-gray-500">
                      por {author?.name || "Unknown"}
                    </p>
                    <p className="text-sm mb-2 line-clamp-2 text-gray-500">
                      {book.description}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-900">
                        {book.editorial.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(book.publishingDate).getFullYear()}
                      </span>
                    </div>
                    <p className="text-xs mb-4 text-gray-400">
                      ISBN: {book.isbn}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2 pt-3 border-t border-gray-200">
                      <Link
                        href={`/books/${book.id}/edit`}
                        className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-900 hover:bg-gray-200 transition-all"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "¿Estás seguro de que quieres eliminar este libro?",
                            )
                          ) {
                            deleteBook(book.id);
                          }
                        }}
                        className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
