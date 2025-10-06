'use client';

import { useData } from '@/context/DataContext';
import Link from 'next/link';
import Image from 'next/image';
import { getReadingStatus } from '@/lib/types';

export default function Authors() {
  const { authors, deleteAuthor, updateReadingProgress, readingStats } = useData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
                Autores
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Descubre y gestiona tu colección de autores
              </p>
            </div>

            {/* Reading Statistics */}
            <div className="flex gap-4">
              <div className="text-center px-4 py-2 rounded-lg bg-gray-50">
                <div className="text-2xl font-bold text-red-500">
                  {readingStats.average.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">
                  Promedio
                </div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-gray-50">
                <div className="text-xl font-bold text-gray-400">
                  {readingStats.sinIniciar}
                </div>
                <div className="text-xs text-gray-500">
                  Sin iniciar
                </div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-gray-50">
                <div className="text-xl font-bold text-red-500">
                  {readingStats.enCurso}
                </div>
                <div className="text-xs text-gray-500">
                  En curso
                </div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-gray-50">
                <div className="text-xl font-bold text-teal-500">
                  {readingStats.completado}
                </div>
                <div className="text-xs text-gray-500">
                  Completado
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-3">
          <Link
            href="/authors/new"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-400 shadow transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            + Agregar Nuevo Autor
          </Link>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold bg-white text-gray-900 border border-gray-300 shadow transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Volver a Libros
          </Link>
        </div>
      </div>

      {/* Authors Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {authors.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow">
            <p className="text-lg text-gray-500">No se encontraron autores. ¡Agrega tu primer autor!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
              <div
                key={author.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              >
                {/* Author Image */}
                <Image
                  src={author.image}
                  alt={author.name}
                  width={400}
                  height={240}
                  className="w-full h-48 object-cover"
                  unoptimized
                />

                {/* Author Info */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1 text-gray-900">
                    {author.name}
                  </h3>
                  <p className="text-sm mb-2 line-clamp-2 text-gray-500">
                    {author.description}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-900">
                      Nacido {new Date(author.birthDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>

                  {/* Reading Progress Slider */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-semibold text-gray-900">
                        Progreso de Lectura
                      </label>
                      <span className={`text-xs font-medium ${
                        author.readingProgress === 0 ? 'text-gray-400' :
                        author.readingProgress === 100 ? 'text-teal-500' : 'text-red-500'
                      }`}>
                        {getReadingStatus(author.readingProgress)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={author.readingProgress}
                      onChange={(e) => updateReadingProgress(author.id, Number(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #ef4444 ${author.readingProgress}%, #e5e7eb ${author.readingProgress}%)`,
                      }}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">0%</span>
                      <span className="text-xs font-semibold text-gray-900">
                        {author.readingProgress}%
                      </span>
                      <span className="text-xs text-gray-500">100%</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <Link
                      href={`/authors/${author.id}/edit`}
                      className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-900 hover:bg-gray-200 transition-all"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm('¿Estás seguro de que quieres eliminar este autor?')) {
                          deleteAuthor(author.id);
                        }
                      }}
                      className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
