'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema, BookFormData } from '@/lib/validation';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewBook() {
  const { addBook, authors } = useData();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  const onSubmit = async (data: BookFormData) => {
    const { authorId, editorialName, ...bookData } = data;
    const book = {
      ...bookData,
      editorial: {
        id: Date.now(),
        name: editorialName,
      },
    };
    addBook(book, Number(authorId));
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm font-medium mb-2 inline-block text-gray-500">
            ← Volver a Libros
          </Link>
          <h1 className="text-4xl font-semibold text-gray-900" style={{ letterSpacing: '-0.5px' }}>
            Agregar Nuevo Libro
          </h1>
          <p className="mt-1 text-base text-gray-500">
            Completa los detalles para agregar un nuevo libro a tu colección
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl p-8 shadow border border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-900">
                Nombre del Libro
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="w-full px-4 py-3 rounded-lg text-base transition-all bg-white text-gray-900 border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              />
              {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="authorId" className="block text-sm font-semibold mb-2 text-gray-900">
                Autor
              </label>
              <select
                id="authorId"
                {...register('authorId')}
                className="w-full px-4 py-3 rounded-lg text-base transition-all bg-white text-gray-900 border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              >
                <option value="">Selecciona un autor</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
              {errors.authorId && (
                <p className="mt-2 text-sm text-red-500">{errors.authorId.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold mb-2 text-gray-900">
                Descripción
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows={4}
                className="w-full px-4 py-3 rounded-lg text-base transition-all bg-white text-gray-900 border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="isbn" className="block text-sm font-semibold mb-2 text-gray-900">
                ISBN
              </label>
              <input
                type="text"
                id="isbn"
                {...register('isbn')}
                className="w-full px-4 py-3 rounded-lg text-base transition-all bg-white text-gray-900 border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              />
              {errors.isbn && <p className="mt-2 text-sm text-red-500">{errors.isbn.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="publishingDate" className="block text-sm font-semibold mb-2 text-gray-900">
                  Fecha de Publicación
                </label>
                <input
                  type="date"
                  id="publishingDate"
                  {...register('publishingDate')}
                  className="w-full px-4 py-3 rounded-lg text-base transition-all bg-white text-gray-900 border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                />
                {errors.publishingDate && (
                  <p className="mt-2 text-sm text-red-500">{errors.publishingDate.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="editorialName" className="block text-sm font-semibold mb-2 text-gray-900">
                  Editorial
                </label>
                <input
                  type="text"
                  id="editorialName"
                  {...register('editorialName')}
                  className="w-full px-4 py-3 rounded-lg text-base transition-all bg-white text-gray-900 border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                />
                {errors.editorialName && <p className="mt-2 text-sm text-red-500">{errors.editorialName.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-semibold mb-2 text-gray-900">
                URL de Imagen
              </label>
              <input
                type="text"
                id="image"
                {...register('image')}
                className="w-full px-4 py-3 rounded-lg text-base transition-all bg-white text-gray-900 border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              />
              {errors.image && <p className="mt-2 text-sm text-red-500">{errors.image.message}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 bg-gradient-to-r from-red-500 to-red-400 shadow hover:-translate-y-0.5 hover:shadow-lg"
              >
                {isSubmitting ? 'Agregando...' : 'Agregar Libro'}
              </button>
              <Link
                href="/"
                className="flex-1 px-6 py-3 rounded-lg font-semibold text-center transition-all bg-white text-gray-900 border border-gray-300 shadow hover:bg-gray-50"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
