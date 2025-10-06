'use client';

import { useData } from '@/context/DataContext';
import Link from 'next/link';
import Image from 'next/image';

export default function Authors() {
  const { authors, deleteAuthor } = useData();

  return (
    <div className="min-h-screen" style={{ background: '#f7f7f7' }}>
      {/* Header */}
      <div className="bg-white border-b" style={{ borderColor: '#dddddd' }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-semibold" style={{ color: '#222222', letterSpacing: '-0.5px' }}>
            Autores
          </h1>
          <p className="mt-1 text-base" style={{ color: '#717171' }}>
            Descubre y gestiona tu colección de autores
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-3">
          <Link
            href="/authors/new"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white transition-all"
            style={{
              background: 'linear-gradient(to right, #ff5a5f, #ff7e82)',
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
            + Agregar Nuevo Autor
          </Link>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all"
            style={{
              background: 'white',
              color: '#222222',
              border: '1px solid #dddddd',
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

      {/* Authors Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {authors.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)' }}>
            <p className="text-lg" style={{ color: '#717171' }}>No se encontraron autores. ¡Agrega tu primer autor!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
              <div
                key={author.id}
                className="bg-white rounded-xl overflow-hidden transition-all cursor-pointer"
                style={{
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
                  border: '1px solid #ebebeb'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
                }}
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
                  <h3 className="text-lg font-semibold mb-1" style={{ color: '#222222' }}>
                    {author.name}
                  </h3>
                  <p className="text-sm mb-2 line-clamp-2" style={{ color: '#717171' }}>
                    {author.description}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: '#f7f7f7',
                        color: '#222222'
                      }}
                    >
                      Nacido {new Date(author.birthDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3" style={{ borderTop: '1px solid #ebebeb' }}>
                    <Link
                      href={`/authors/${author.id}/edit`}
                      className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium transition-all"
                      style={{
                        background: '#f7f7f7',
                        color: '#222222'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#ebebeb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#f7f7f7';
                      }}
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm('¿Estás seguro de que quieres eliminar este autor?')) {
                          deleteAuthor(author.id);
                        }
                      }}
                      className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                      style={{
                        background: '#fff5f5',
                        color: '#ff5a5f'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#ffe5e6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff5f5';
                      }}
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
