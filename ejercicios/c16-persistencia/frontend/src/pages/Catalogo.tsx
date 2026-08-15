import { Spinner, Alert } from 'react-bootstrap';
import BookCard from "../componentes/BookCard";
import { Libro } from "../types/libro";
import { useFetch } from '../../public/hooks/useFetch';


export default function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>('../../public/mocklibros.json');
  if(loading) return <Spinner animation = "border"/>;
  if(error) return <Alert variant="danger">{error}</Alert>
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Nuestro Catálogo</h2>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {(libros ?? []).map((libro) => (
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