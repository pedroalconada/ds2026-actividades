
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Bienvenidos a Patio Interno</h1>
      <p>Libros que acompañan cada momento.</p>
      <Link to="/catalogo" className="btn btn-primary">
        Ver catálogo
      </Link>
    </div>
  );
}