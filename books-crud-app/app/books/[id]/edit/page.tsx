'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema, BookFormData } from '@/lib/validation';
import { useData } from '@/context/DataContext';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function EditBook() {
  const { updateBook, authors, getBookById } = useData();
  const router = useRouter();
  const params = useParams();
  const bookId = Number(params.id);

  const book = getBookById(bookId);
  const bookAuthor = authors.find(a => a.books.some(b => b.id === bookId));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  useEffect(() => {
    if (book && bookAuthor) {
      reset({
        name: book.name,
        isbn: book.isbn,
        publishingDate: book.publishingDate,
        description: book.description,
        image: book.image,
        editorialName: book.editorial.name,
        authorId: String(bookAuthor.id),
      });
    }
  }, [book, bookAuthor, reset]);

  if (!book) {
    return (
      <div className="min-h-screen" style={{ background: '#f7f7f7' }}>
        {/* Header */}
        <div className="bg-white border-b" style={{ borderColor: '#dddddd' }}>
          <div className="max-w-3xl mx-auto px-6 py-6">
            <Link href="/" className="text-sm font-medium mb-2 inline-block" style={{ color: '#717171' }}>
              ← Volver a Libros
            </Link>
            <h1 className="text-4xl font-semibold" style={{ color: '#222222', letterSpacing: '-0.5px' }}>
              Libro No Encontrado
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl p-8" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)', border: '1px solid #ebebeb' }}>
            <p className="text-lg mb-6" style={{ color: '#717171' }}>
              No se pudo encontrar el libro que buscas.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-lg font-semibold transition-all"
              style={{
                background: 'linear-gradient(to right, #ff5a5f, #ff7e82)',
                color: 'white',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
              }}
            >
              Volver a Libros
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: BookFormData) => {
    const { editorialName, authorId, ...bookData } = data;
    const updatedBook = {
      ...bookData,
      editorial: {
        id: book?.editorial.id || Date.now(),
        name: editorialName,
      },
    };
    updateBook(bookId, updatedBook);
    router.push('/');
  };

  return (
    <div className="min-h-screen" style={{ background: '#f7f7f7' }}>
      {/* Header */}
      <div className="bg-white border-b" style={{ borderColor: '#dddddd' }}>
        <div className="max-w-3xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm font-medium mb-2 inline-block" style={{ color: '#717171' }}>
            ← Volver a Libros
          </Link>
          <h1 className="text-4xl font-semibold" style={{ color: '#222222', letterSpacing: '-0.5px' }}>
            Editar Libro
          </h1>
          <p className="mt-1 text-base" style={{ color: '#717171' }}>
            Actualiza los detalles del libro
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl p-8" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)', border: '1px solid #ebebeb' }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: '#222222' }}>
                Nombre del Libro
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="w-full px-4 py-3 rounded-lg text-base transition-all"
                style={{
                  border: '1px solid #dddddd',
                  background: 'white',
                  color: '#222222'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#222222';
                  e.currentTarget.style.boxShadow = '0 0 0 1px #222222';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#dddddd';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              {errors.name && <p className="mt-2 text-sm" style={{ color: '#ff5a5f' }}>{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold mb-2" style={{ color: '#222222' }}>
                Descripción
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows={4}
                className="w-full px-4 py-3 rounded-lg text-base transition-all"
                style={{
                  border: '1px solid #dddddd',
                  background: 'white',
                  color: '#222222'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#222222';
                  e.currentTarget.style.boxShadow = '0 0 0 1px #222222';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#dddddd';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              {errors.description && (
                <p className="mt-2 text-sm" style={{ color: '#ff5a5f' }}>{errors.description.message}</p>
              )}
            </div>

            {/* Hidden author field - books can't change authors when editing */}
            <input type="hidden" {...register('authorId')} />

            <div>
              <label htmlFor="isbn" className="block text-sm font-semibold mb-2" style={{ color: '#222222' }}>
                ISBN
              </label>
              <input
                type="text"
                id="isbn"
                {...register('isbn')}
                className="w-full px-4 py-3 rounded-lg text-base transition-all"
                style={{
                  border: '1px solid #dddddd',
                  background: 'white',
                  color: '#222222'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#222222';
                  e.currentTarget.style.boxShadow = '0 0 0 1px #222222';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#dddddd';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              {errors.isbn && <p className="mt-2 text-sm" style={{ color: '#ff5a5f' }}>{errors.isbn.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="publishingDate" className="block text-sm font-semibold mb-2" style={{ color: '#222222' }}>
                  Fecha de Publicación
                </label>
                <input
                  type="date"
                  id="publishingDate"
                  {...register('publishingDate')}
                  className="w-full px-4 py-3 rounded-lg text-base transition-all"
                  style={{
                    border: '1px solid #dddddd',
                    background: 'white',
                    color: '#222222'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#222222';
                    e.currentTarget.style.boxShadow = '0 0 0 1px #222222';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#dddddd';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                {errors.publishingDate && (
                  <p className="mt-2 text-sm" style={{ color: '#ff5a5f' }}>{errors.publishingDate.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="editorialName" className="block text-sm font-semibold mb-2" style={{ color: '#222222' }}>
                  Editorial
                </label>
                <input
                  type="text"
                  id="editorialName"
                  {...register('editorialName')}
                  className="w-full px-4 py-3 rounded-lg text-base transition-all"
                  style={{
                    border: '1px solid #dddddd',
                    background: 'white',
                    color: '#222222'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#222222';
                    e.currentTarget.style.boxShadow = '0 0 0 1px #222222';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#dddddd';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                {errors.editorialName && <p className="mt-2 text-sm" style={{ color: '#ff5a5f' }}>{errors.editorialName.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-semibold mb-2" style={{ color: '#222222' }}>
                URL de Imagen
              </label>
              <input
                type="text"
                id="image"
                {...register('image')}
                className="w-full px-4 py-3 rounded-lg text-base transition-all"
                style={{
                  border: '1px solid #dddddd',
                  background: 'white',
                  color: '#222222'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#222222';
                  e.currentTarget.style.boxShadow = '0 0 0 1px #222222';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#dddddd';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              {errors.image && <p className="mt-2 text-sm" style={{ color: '#ff5a5f' }}>{errors.image.message}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50"
                style={{
                  background: 'linear-gradient(to right, #ff5a5f, #ff7e82)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
                }}
              >
                {isSubmitting ? 'Actualizando...' : 'Actualizar Libro'}
              </button>
              <Link
                href="/"
                className="flex-1 px-6 py-3 rounded-lg font-semibold text-center transition-all"
                style={{
                  background: 'white',
                  color: '#222222',
                  border: '1px solid #dddddd',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f7f7f7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
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
