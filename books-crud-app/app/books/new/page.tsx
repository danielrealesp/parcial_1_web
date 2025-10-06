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
    addBook(data);
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
            Agregar Nuevo Libro
          </h1>
          <p className="mt-1 text-base" style={{ color: '#717171' }}>
            Completa los detalles para agregar un nuevo libro a tu colección
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl p-8" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)', border: '1px solid #ebebeb' }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold mb-2" style={{ color: '#222222' }}>
                Título
              </label>
              <input
                type="text"
                id="title"
                {...register('title')}
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
              {errors.title && <p className="mt-2 text-sm" style={{ color: '#ff5a5f' }}>{errors.title.message}</p>}
            </div>

            <div>
              <label htmlFor="authorId" className="block text-sm font-semibold mb-2" style={{ color: '#222222' }}>
                Autor
              </label>
              <select
                id="authorId"
                {...register('authorId')}
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
              >
                <option value="">Selecciona un autor</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
              {errors.authorId && (
                <p className="mt-2 text-sm" style={{ color: '#ff5a5f' }}>{errors.authorId.message}</p>
              )}
            </div>

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
                <label htmlFor="publishedYear" className="block text-sm font-semibold mb-2" style={{ color: '#222222' }}>
                  Año de Publicación
                </label>
                <input
                  type="number"
                  id="publishedYear"
                  {...register('publishedYear', { valueAsNumber: true })}
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
                {errors.publishedYear && (
                  <p className="mt-2 text-sm" style={{ color: '#ff5a5f' }}>{errors.publishedYear.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="genre" className="block text-sm font-semibold mb-2" style={{ color: '#222222' }}>
                  Género
                </label>
                <input
                  type="text"
                  id="genre"
                  {...register('genre')}
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
                {errors.genre && <p className="mt-2 text-sm" style={{ color: '#ff5a5f' }}>{errors.genre.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-semibold mb-2" style={{ color: '#222222' }}>
                URL de Imagen
              </label>
              <input
                type="text"
                id="imageUrl"
                {...register('imageUrl')}
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
              {errors.imageUrl && <p className="mt-2 text-sm" style={{ color: '#ff5a5f' }}>{errors.imageUrl.message}</p>}
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
                {isSubmitting ? 'Agregando...' : 'Agregar Libro'}
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
