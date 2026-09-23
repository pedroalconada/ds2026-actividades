import { useParams, Link } from "react-router-dom";
import { Spinner, Alert, Card, Container } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { Libro } from "../types/libro";

export default function LibroDetalle() {
  const { id } = useParams();
  const { data: libro, loading, error } = useFetch<Libro>(`/libros/${id}`);

  if (loading) return <Container className="py-5 text-center"><Spinner animation="border" /></Container>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
  if (!libro) return <Container className="py-5"><Alert variant="warning">Libro no encontrado</Alert></Container>;

  return (
    <Container className="py-5" style={{ maxWidth: 600 }}>
      <Card>
        {libro.imagen && <Card.Img variant="top" src={libro.imagen} style={{ maxHeight: 350, objectFit: "contain" }} />}
        <Card.Body>
          <Card.Title className="h3 mb-3">{libro.titulo}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            Autor: {libro.autor?.nombre ?? "Desconocido"} ({libro.autor?.nacionalidad})
          </Card.Subtitle>
          <Card.Text>
            <strong>Precio:</strong> ${libro.precio}<br />
            <strong>Estado:</strong> {libro.disponible ? "Disponible" : "No disponible"}
          </Card.Text>
          <Link to="/catalogo" className="btn btn-secondary mt-3">
            Volver al Catálogo
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}