import { prisma } from "../src/config/prisma";

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "George Orwell", nacionalidad: "Reino Unido" },
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
];

const categorias = [
  { nombre: "Novela" },
  { nombre: "Ficción" },
  { nombre: "Clásico" },
];

const libros = [
  {
    titulo: "El principito",
    precio: 4500,
    imagen: "https://via.placeholder.com/150",
    disponible: true,
    autor: "Antoine de Saint-Exupéry",
    cats: ["Novela", "Clásico"],
  },
  {
    titulo: "1984",
    precio: 6000,
    imagen: "https://via.placeholder.com/150",
    disponible: true,
    autor: "George Orwell",
    cats: ["Novela", "Ficción"],
  },
];

async function main() {

  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });


  for (const { autor, cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: { connect: cats.map((nombre) => ({ nombre })) },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });