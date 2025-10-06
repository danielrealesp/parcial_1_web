export interface Editorial {
  id: number;
  name: string;
}

export interface Organization {
  id: number;
  name: string;
  tipo: string;
}

export interface Prize {
  id: number;
  premiationDate: string;
  name: string;
  description: string;
  organization: Organization;
}

export interface Book {
  id: number;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;
  editorial: Editorial;
}

export type ReadingStatus = 'Sin iniciar' | 'En curso' | 'Completado';

export interface Author {
  id: number;
  birthDate: string;
  name: string;
  description: string;
  image: string;
  books: Book[];
  prizes: Prize[];
  readingProgress: number; // 0-100
}

export interface ReadingStats {
  average: number;
  sinIniciar: number;
  enCurso: number;
  completado: number;
}

// Helper function to get reading status from progress
export function getReadingStatus(progress: number): ReadingStatus {
  if (progress === 0) return 'Sin iniciar';
  if (progress === 100) return 'Completado';
  return 'En curso';
}
