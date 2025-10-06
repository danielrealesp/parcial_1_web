'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authorSchema, AuthorFormData } from '@/lib/validation';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewAuthor() {
  const { addAuthor } = useData();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
  });

  const onSubmit = async (data: AuthorFormData) => {
    addAuthor(data);
    router.push('/authors');
  };

  return (
    <div className="min-h-screen" style={{ background: '#f7f7f7' }}>
      {/* Header */}
      <div className="bg-white border-b" style={{ borderColor: '#dddddd' }}>
        <div className="max-w-3xl mx-auto px-6 py-6">
          <Link href="/authors" className="text-sm font-medium mb-2 inline-block" style={{ color: '#717171' }}>
            ← Volver a Autores
          </Link>
          <h1 className="text-4xl font-semibold" style={{ color: '#222222', letterSpacing: '-0.5px' }}>
            Agregar Nuevo Autor
          </h1>
          <p className="mt-1 text-base" style={{ color: '#717171' }}>
            Completa los detalles para agregar un nuevo autor a tu colección
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl p-8" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)', border: '1px solid #ebebeb' }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: '#222222' }}>
                Nombre
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
              <label htmlFor="birthDate" className="block text-sm font-semibold mb-2" style={{ color: '#222222' }}>
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                id="birthDate"
                {...register('birthDate')}
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
              {errors.birthDate && (
                <p className="mt-2 text-sm" style={{ color: '#ff5a5f' }}>{errors.birthDate.message}</p>
              )}
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
                {isSubmitting ? 'Agregando...' : 'Agregar Autor'}
              </button>
              <Link
                href="/authors"
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
