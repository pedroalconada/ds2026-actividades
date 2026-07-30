import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

export type Libro = {
    id: string;
    title: string;
    author: string;
    image: string;
}; 

const libros: Libro[] = [
  {
    id: "1",
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    image: ""
  },
  {
    id: "2",
    title: "Harry Potter",
    author: "J.K Rowling",
    image: ""
  }
];

app.get("/libros", (_req, res) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});