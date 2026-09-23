import { Alert, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SinPermiso() {
  return (
    <Container className="py-5 text-center">
      <Alert variant="warning">
        <Alert.Heading>Acceso denegado</Alert.Heading>
        <p>No tenés permiso para ver esta página o realizar esta acción.</p>
      </Alert>
      <Link to="/catalogo" className="btn btn-primary">
        Volver al catálogo
      </Link>
    </Container>
  );
}