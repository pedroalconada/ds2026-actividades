import { z } from "zod";

export const ASUNTOS = ["Reclamo", "Consulta general", "Sugerencia"] as const;

export const contactoSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(100),
  email: z.string().trim().toLowerCase().pipe(z.email("Email inválido")),
  asunto: z.enum(ASUNTOS, { message: "Elegí un asunto" }),
  mensaje: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres").max(1000),
});

export type ContactoFormValues = z.infer<typeof contactoSchema>;
