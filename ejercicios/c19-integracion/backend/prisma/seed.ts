import { prisma } from "../src/config/prisma";
import bcrypt from "bcrypt";

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

const usuarios = [
  {
    email: "admin@libreria.test",
    nombre: "Admin",
    rol: "ADMIN" as const,
    password: "Admin1234",
  },
  {
    email: "cliente@libreria.test",
    nombre: "Cliente",
    rol: "CLIENTE" as const,
    password: "Cliente1234",
  },
];

async function main() {

  await prisma.autor.createMany({ data: autores, skipDuplicates: true });
  await prisma.categoria.createMany({ data: categorias, skipDuplicates: true });


 for (const { autor, cats, ...datos } of libros) {
     const existe = await prisma.libro.findFirst({ where: { titulo: datos.titulo } });
     if (!existe) {
       await prisma.libro.create({
         data: {
           ...datos,
           autor: { connect: { nombre: autor } },
           categorias: { connect: cats.map((nombre) => ({ nombre })) },
         },
       });
     }
   }

for (const { password, ...datos } of usuarios) {
    await prisma.usuario.upsert({
      where: { email: datos.email },
      update: {},
      create: {
        ...datos,
        passwordHash: await bcrypt.hash(password, 10),
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