import { Libro } from "../types/libro.types";

const libros: Libro[] = [
  { id: 1, title: "El principito", author: "Antoine de Saint-Exupéry", image: "" },
  { id: 2, title: "1984", author: "George Orwell", image: "" }
];
let proximoId = 3;

export function findAll(): Libro[] {
  return libros;
}

export function findById(id: number): Libro | undefined {
  return libros.find((l) => l.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const index = libros.findIndex((l) => l.id === id);
  if (index === -1) return undefined;
  libros[index] = { id, ...datos };
  return libros[index];
}

export function remove(id: number): boolean {
  const index = libros.findIndex((l) => l.id === id);
  if (index === -1) return false;
  libros.splice(index, 1);
  return true;
}