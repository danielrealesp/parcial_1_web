import { z } from 'zod';

// Helper to validate date strings (YYYY-MM-DD format)
const dateStringSchema = z.string()
  .min(1, 'La fecha es requerida')
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (debe ser YYYY-MM-DD)')
  .refine((date) => !isNaN(Date.parse(date)), 'Fecha inválida');

export const bookSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(200, 'El nombre es muy largo'),
  isbn: z.string().min(1, 'El ISBN es requerido'),
  publishingDate: dateStringSchema,
  description: z.string().min(1, 'La descripción es requerida').max(1000, 'La descripción es muy larga'),
  image: z.string().url('Debe ser una URL válida').min(1, 'La URL de imagen es requerida'),
  editorialName: z.string().min(1, 'El nombre de la editorial es requerido').max(100, 'El nombre de la editorial es muy largo'),
  authorId: z.string().min(1, 'Debes seleccionar un autor'),
});

export const authorSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre es muy largo'),
  birthDate: dateStringSchema,
  description: z.string().min(1, 'La descripción es requerida').max(2000, 'La descripción es muy larga'),
  image: z.string().url('Debe ser una URL válida').min(1, 'La URL de imagen es requerida'),
});

export type BookFormData = z.infer<typeof bookSchema>;
export type AuthorFormData = z.infer<typeof authorSchema>;
