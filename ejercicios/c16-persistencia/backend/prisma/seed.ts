import { prisma } from "../src/config/prisma";

const libros = [
  { titulo: "El principito", 
    autor: "Antoine de Saint-Exupéry",
    precio: 5000, 
    imagen: "", 
    disponible: true },

  { titulo: "1984",
    autor: "George Orwell",
    precio: 4500, 
    imagen: "", 
    disponible: true },
];

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "George Orwell", nacionalidad: "Reino Unido" },
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });