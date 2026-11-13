
import { z } from 'zod';

export const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es obligatorio'),
  autor: z.string().trim().min(1, 'El nombre del autor es obligatorio'),
  autorId: z.coerce.number().int().positive().optional(),
  precio: z.coerce.number().int().positive('El precio debe ser mayor a 0'),
  imagen: z.string().trim().min(1, 'La URL de la imagen es obligatoria'),
  disponible: z.boolean().default(true),
});

export type LibroValidado = z.infer<typeof libroSchema>;
export type LibroInput = z.input<typeof libroSchema>;