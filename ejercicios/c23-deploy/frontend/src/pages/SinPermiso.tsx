import { Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SinPermiso() {
  return (
    <Container className="py-5 text-center" style={{ maxWidth: 560 }}>
      <div className="glass-container">
        <Alert variant="warning" className="mb-4 text-start">
          <Alert.Heading className="h4">Acceso denegado</Alert.Heading>
          <p className="mb-0">No tenés permiso para ver esta página o realizar esta acción.</p>
        </Alert>
        <Link to="/catalogo" className="btn btn-primary">
          Volver al catálogo
        </Link>
      </div>
    </Container>
  );
}