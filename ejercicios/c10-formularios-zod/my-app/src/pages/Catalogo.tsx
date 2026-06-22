// src/pages/Catalogo.tsx
import BookCard from "../componentes/BookCard";
import { Libro } from "../types/libro";

type Props = {
  libros: Libro[];
};

export default function Catalogo({ libros }: Props) {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Nuestro Catálogo</h2>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {libros.map((libro) => (
          <BookCard
            key={libro.id}
            id={libro.id}
            title={libro.title}
            author={libro.author}
            image={libro.image}
          />
        ))}
      </div>
    </div>
  );
}