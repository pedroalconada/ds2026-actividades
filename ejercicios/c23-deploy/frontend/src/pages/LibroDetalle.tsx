import { useParams, Link } from "react-router-dom";
import { Spinner, Alert, Container } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { Libro } from "../types/libro";

export default function LibroDetalle() {
  const { id } = useParams();
  const { data: libro, loading, error } = useFetch<Libro>(`/libros/${id}`);

  if (loading) {
    return (
      <Container className="py-5 text-center" style={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Spinner animation="border" />
      </Container>
    );
  }
  if (error) {
    return (
      <Container className="py-5" style={{ maxWidth: 700 }}>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }
  if (!libro) {
    return (
      <Container className="py-5" style={{ maxWidth: 700 }}>
        <Alert variant="warning">Libro no encontrado</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ maxWidth: 900 }}>
      <div className="book-detail-wrapper">
        <div className="book-detail-grid">
          <div>
            <img
              src={libro.imagen || "/img/elPrincipito.jpg"}
              alt={libro.titulo}
              className="book-detail-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/img/elPrincipito.jpg";
              }}
            />
          </div>
          <div className="d-flex flex-column">
            <h1 style={{ fontSize: "2.4rem", marginBottom: "8px" }}>{libro.titulo}</h1>
            <p className="card-author" style={{ fontSize: "1.15rem", marginBottom: "20px" }}>
              Autor: {libro.autor?.nombre ?? "Desconocido"} {libro.autor?.nacionalidad ? `(${libro.autor.nacionalidad})` : ""}
            </p>

            <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "20px" }}>
              Estado: <span style={{ color: libro.disponible ? "#a8f5ba" : "#fca5a5", fontWeight: 600 }}>
                {libro.disponible ? "Disponible" : "No disponible"}
              </span>
            </p>

            <div className="book-detail-price">
              ${libro.precio}
            </div>

            <div style={{ display: "flex", gap: "15px", marginTop: "auto", flexWrap: "wrap" }}>
              <Link to="/catalogo" className="btn btn-outline" style={{ flex: 1, minWidth: 160 }}>
                Volver al Catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}