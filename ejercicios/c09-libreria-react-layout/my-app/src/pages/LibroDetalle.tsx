import { useParams } from "react-router-dom";

export default function LibroDetalle() {
  const { id } = useParams();

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Detalle del Libro</h2>
      <p>Estás viendo la información del libro con ID: <strong>{id}</strong></p>
    </div>
  );
}