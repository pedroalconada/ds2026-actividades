import { useState } from 'react';
import { Spinner, Alert, Form } from 'react-bootstrap';
import BookCard from "../componentes/BookCard";
import { Libro } from "../types/libro";
import { useFetch } from '../hooks/useFetch';

const normalizar = (texto: string) =>
  texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros');
  const [busqueda, setBusqueda] = useState('');
  const [genero, setGenero] = useState('');

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '40vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5" style={{ maxWidth: 700 }}>
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  const todos = libros ?? [];
  const generos = [...new Set(todos.flatMap((l) => (l.categorias ?? []).map((c) => c.nombre)))].sort();

  const termino = normalizar(busqueda.trim());
  const librosFiltrados = todos.filter((l) => {
    const coincideTexto =
      !termino ||
      normalizar(l.titulo).includes(termino) ||
      normalizar(l.autor?.nombre ?? '').includes(termino);
    const coincideGenero = !genero || (l.categorias ?? []).some((c) => c.nombre === genero);
    return coincideTexto && coincideGenero;
  });

  return (
    <div className="container py-5">
      <h2 className="section-title">Nuestro Catálogo</h2>

      <div className="d-flex flex-wrap gap-3 justify-content-center mb-4">
        <Form.Control
          type="search"
          placeholder="Buscar por título o autor..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ maxWidth: 420 }}
        />
        <Form.Select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          style={{ maxWidth: 220 }}
          aria-label="Filtrar por género"
        >
          <option value="">Todos los géneros</option>
          {generos.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </Form.Select>
      </div>

      {librosFiltrados.length === 0 && (
        <p className="text-center">No se encontraron libros con esos filtros.</p>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", justifyContent: "center" }}>
        {librosFiltrados.map((libro) => (
          <BookCard
            key={libro.id}
            {...libro}
          />
        ))}
      </div>
    </div>
  );
}
