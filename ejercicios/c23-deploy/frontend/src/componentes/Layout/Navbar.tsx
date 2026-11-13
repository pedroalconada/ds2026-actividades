import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function MyNavbar() {
  const navigate = useNavigate();
  const { usuario, logout, tieneRol } = useAuth();

  const manejarSesion = () => {
    if (usuario) {
      logout();
      navigate("/");
    } else {
      navigate("/login")
    }
  };

  return (
    <Navbar expand="lg" className="navbar-patio" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" title="Patio Interno">
          <img src="/img/logoPatioInterno.png" alt="Patio Interno" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-lg-3">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            
            {tieneRol('ADMIN') && (
              <Nav.Link as={Link} to="/libros/nuevo">Nuevo Libro</Nav.Link>
            )}
          </Nav>
          
          <Nav className="align-items-center mt-3 mt-lg-0">
            {usuario && (
              <Navbar.Text className="me-3 text-white fw-medium">
                Hola, {usuario.nombre}
              </Navbar.Text>
            )}

            <Button variant="outline-light" size="sm" onClick={manejarSesion}>
              {usuario ? "Salir" : "Ingresar"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}