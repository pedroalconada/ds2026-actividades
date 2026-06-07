import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Libro } from "../types/libro"

export default function BookCard({ id, title, author, image }: Libro) {
  const [liked, setLiked] = useState(false);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{author}</Card.Text>

       <div className="d-flex justify-content-between">
        <Button onClick={() => setLiked(!liked)}>
          {liked ? "Te gusta ❤️" : "Me gusta"}
        </Button>

        <Link to={`/libros/${id}`} className="btn btn-primary">
            Ver más
        </Link>
        </div>

      </Card.Body>
    </Card>
  );
}