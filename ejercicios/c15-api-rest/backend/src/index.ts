import express from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";

const app = express();
const PORT = 3000;

app.use(express.json()); // Obligatorio antes de las rutas para parsear req.body

app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});