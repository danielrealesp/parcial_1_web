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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <Link href="/authors" className="text-sm font-medium mb-2 inline-block text-gray-500">
            ← Volver a Autores
          </Link>
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
            Agregar Nuevo Autor
          </h1>
          <p className="mt-1 text-base text-gray-500">
            Completa los detalles para agregar un nuevo autor a tu colección
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl p-8 shadow border border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-900">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="w-full px-4 py-3 rounded-lg text-base border border-gray-300 bg-white text-gray-900 transition-all focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              />
              {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-semibold mb-2 text-gray-900">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                id="birthDate"
                {...register('birthDate')}
                className="w-full px-4 py-3 rounded-lg text-base border border-gray-300 bg-white text-gray-900 transition-all focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              />
              {errors.birthDate && (
                <p className="mt-2 text-sm text-red-500">{errors.birthDate.message}</p>
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
                className="w-full px-4 py-3 rounded-lg text-base border border-gray-300 bg-white text-gray-900 transition-all focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-semibold mb-2 text-gray-900">
                URL de Imagen
              </label>
              <input
                type="text"
                id="image"
                {...register('image')}
                className="w-full px-4 py-3 rounded-lg text-base border border-gray-300 bg-white text-gray-900 transition-all focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              />
              {errors.image && <p className="mt-2 text-sm text-red-500">{errors.image.message}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-400 shadow transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Agregando...' : 'Agregar Autor'}
              </button>
              <Link
                href="/authors"
                className="flex-1 px-6 py-3 rounded-lg font-semibold text-center bg-white text-gray-900 border border-gray-300 shadow transition-all hover:bg-gray-50"
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
