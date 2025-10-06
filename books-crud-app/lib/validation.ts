import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(200, 'El título es muy largo'),
  authorId: z.string().min(1, 'El autor es requerido'),
  isbn: z.string().min(1, 'El ISBN es requerido'),
  publishedYear: z.number().min(1000, 'El año debe ser al menos 1000').max(new Date().getFullYear(), 'El año no puede ser futuro'),
  genre: z.string().min(1, 'El género es requerido').max(50, 'El género es muy largo'),
  imageUrl: z.string().url('Debe ser una URL válida').min(1, 'La URL de imagen es requerida'),
});

export const authorSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre es muy largo'),
  country: z.string().min(1, 'El país es requerido').max(100, 'El país es muy largo'),
  birthYear: z.number().min(1000, 'El año debe ser al menos 1000').max(new Date().getFullYear(), 'El año no puede ser futuro'),
  imageUrl: z.string().url('Debe ser una URL válida').min(1, 'La URL de imagen es requerida'),
});

export type BookFormData = z.infer<typeof bookSchema>;
export type AuthorFormData = z.infer<typeof authorSchema>;
