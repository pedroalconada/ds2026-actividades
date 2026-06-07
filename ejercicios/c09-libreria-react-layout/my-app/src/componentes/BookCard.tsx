import { Card, Button } from "react-bootstrap";
import { useState } from "react";

import { libro } from "../types/libro"

export default function BookCard({ title, author, image }: Libro) {
  const [liked, setLiked] = useState(false);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{author}</Card.Text>

        <Button onClick={() => setLiked(!liked)}>
          {liked ? "Te gusta ❤️" : "Me gusta"}
        </Button>
      </Card.Body>
    </Card>
  );
}