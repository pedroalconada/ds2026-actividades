import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Libro } from "../types/libro";

export default function BookCard({ id, titulo, autor, imagen }: Libro) {
  const [liked, setLiked] = useState(false);

  return (
    <Card className="glass-card h-100" style={{ width: "18rem", padding: "16px" }}>
      <div className="card-img-wrapper">
        <img
          src={imagen || "/img/elPrincipito.jpg"}
          alt={titulo}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/img/elPrincipito.jpg";
          }}
        />
      </div>
      <Card.Body className="d-flex flex-column p-0">
        <Card.Title className="card-title" title={titulo}>
          {titulo}
        </Card.Title>
        <div className="card-author mb-3">
          {autor?.nombre}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto gap-2">
          <Button
            variant="glass"
            className="btn-glass"
            onClick={() => setLiked(!liked)}
            style={{ fontSize: "0.88rem", padding: "8px 14px" }}
          >
            {liked ? "Te gusta ❤️" : "Me gusta"}
          </Button>

          <Link
            to={`/libros/${id}`}
            className="btn btn-primary"
            style={{ fontSize: "0.88rem", padding: "8px 16px" }}
          >
            Ver más
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}