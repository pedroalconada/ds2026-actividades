
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <header className="hero-wrapper">
      <h1>Bienvenidos a Patio Interno</h1>
      <p>Descubre libros que acompañan y transforman cada momento de tu vida.</p>
      <Link to="/catalogo" className="btn btn-primary">
        Explorar el catálogo
      </Link>
    </header>
  );
}