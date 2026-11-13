import { z } from "zod";

const libroBaseSchema = z.object({
  titulo: z.string().trim().min(1, "El título es obligatorio").max(200),
  precio: z.number().int().positive("El precio debe ser mayor a 0"),
  imagen: z.string().min(1, "La imagen es obligatoria"),
  disponible: z.boolean().optional(),
  autorId: z.number().int().positive("El autor es obligatorio").optional(),
  autor: z.string().trim().min(1, "El autor es obligatorio").optional(),
});

export const libroCreateSchema = libroBaseSchema.refine(
  (data) => data.autorId !== undefined || (typeof data.autor === "string" && data.autor.length > 0),
  {
    message: "El autor es obligatorio",
    path: ["autorId"],
  }
);

export const libroUpdateSchema = libroBaseSchema.partial();

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un número positivo"),
});

export type LibroCreate = z.infer<typeof libroCreateSchema>;