'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authorSchema, AuthorFormData } from '@/lib/validation';
import { useData } from '@/context/DataContext';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getReadingStatus } from '@/lib/types';

export default function EditAuthor() {
  const { updateAuthor, getAuthorById, updateReadingProgress } = useData();
  const router = useRouter();
  const params = useParams();
  const authorId = Number(params.id);

  const author = getAuthorById(authorId);
  const [localProgress, setLocalProgress] = useState(author?.readingProgress ?? 0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
  });

  useEffect(() => {
    if (author) {
      reset({
        name: author.name,
        birthDate: author.birthDate,
        description: author.description,
        image: author.image,
      });
      setLocalProgress(author.readingProgress);
    }
  }, [author, reset]);

  const handleProgressChange = (newProgress: number) => {
    setLocalProgress(newProgress);
    updateReadingProgress(authorId, newProgress);
  };

  if (!author) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-300">
          <div className="max-w-3xl mx-auto px-6 py-6">
            <Link href="/authors" className="text-sm font-medium mb-2 inline-block text-gray-500">
              ← Volver a Autores
            </Link>
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
              Autor No Encontrado
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl p-8 shadow border border-gray-200">
            <p className="text-lg mb-6 text-gray-500">
              No se pudo encontrar el autor que buscas.
            </p>
            <Link
              href="/authors"
              className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-400 shadow transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Volver a Autores
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: AuthorFormData) => {
    updateAuthor(authorId, data);
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
            Editar Autor
          </h1>
          <p className="mt-1 text-base text-gray-500">
            Actualiza los detalles del autor
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

            {/* Reading Progress Slider */}
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-gray-900">
                  Progreso de Lectura
                </label>
                <span className={`text-sm font-medium ${
                  localProgress === 0 ? 'text-gray-400' :
                  localProgress === 100 ? 'text-teal-500' : 'text-red-500'
                }`}>
                  {getReadingStatus(localProgress)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={localProgress}
                onChange={(e) => handleProgressChange(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ef4444 ${localProgress}%, #e5e7eb ${localProgress}%)`,
                }}
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">0%</span>
                <span className="text-sm font-semibold text-gray-900">
                  {localProgress}%
                </span>
                <span className="text-xs text-gray-500">100%</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-400 shadow transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Actualizando...' : 'Actualizar Autor'}
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
