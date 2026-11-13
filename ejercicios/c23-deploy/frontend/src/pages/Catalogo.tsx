import { Spinner, Alert } from 'react-bootstrap';
import BookCard from "../componentes/BookCard";
import { Libro } from "../types/libro";
import { useFetch } from '../hooks/useFetch';


export default function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros');
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '40vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5" style={{ maxWidth: 700 }}>
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="section-title">Nuestro Catálogo</h2>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", justifyContent: "center" }}>
        {(libros ?? []).map((libro) => (
          <BookCard
            key={libro.id}
            {...libro}
          />
        ))}
      </div>
    </div>
  );
}