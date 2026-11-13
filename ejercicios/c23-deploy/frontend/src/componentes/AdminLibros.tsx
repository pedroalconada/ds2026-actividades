import { useEffect, useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { apiFetch } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { Libro } from '../types/libro';

export default function AdminLibros() {
  const { data, loading, error } = useFetch<Libro[]>('/libros');
  const [libros, setLibros] = useState<Libro[]>([]);
  const [errorAccion, setErrorAccion] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    if (data) setLibros(data);
  }, [data]);

  const normalizar = (texto: string) =>
    texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const termino = normalizar(busqueda.trim());
  const librosFiltrados = termino
    ? libros.filter(
        (l) =>
          normalizar(l.titulo).includes(termino) ||
          normalizar(l.autor?.nombre ?? '').includes(termino)
      )
    : libros;

  const cambiarDisponible = async (libro: Libro) => {
    setErrorAccion(null);
    setOcupado(libro.id);
    try {
      const actualizado = await apiFetch<Libro>(`/libros/${libro.id}`, {
        method: 'PUT',
        body: JSON.stringify({ disponible: !libro.disponible }),
      });
      setLibros((prev) => prev.map((l) => (l.id === libro.id ? actualizado : l)));
    } catch (err: any) {
      setErrorAccion(err.message);
    } finally {
      setOcupado(null);
    }
  };

  const eliminar = async (libro: Libro) => {
    if (!window.confirm(`¿Eliminar "${libro.titulo}"? Esta acción no se puede deshacer.`)) return;
    setErrorAccion(null);
    setOcupado(libro.id);
    try {
      await apiFetch(`/libros/${libro.id}`, { method: 'DELETE' });
      setLibros((prev) => prev.filter((l) => l.id !== libro.id));
    } catch (err: any) {
      setErrorAccion(err.message);
    } finally {
      setOcupado(null);
    }
  };

  return (
    <div className="glass-container mt-4">
      <h2 className="section-title mb-4">Libros del catálogo</h2>

      {loading && (
        <div className="d-flex justify-content-center py-3">
          <Spinner animation="border" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {errorAccion && <Alert variant="danger">{errorAccion}</Alert>}

      {!loading && !error && libros.length > 0 && (
        <Form.Control
          type="search"
          className="mb-3"
          placeholder="Buscar por título o autor..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      )}

      {!loading && !error && libros.length === 0 && <p>No hay libros cargados.</p>}
      {libros.length > 0 && librosFiltrados.length === 0 && (
        <p>No se encontraron libros para "{busqueda}".</p>
      )}

      {librosFiltrados.map((libro) => (
        <div
          key={libro.id}
          className="d-flex align-items-center gap-3 py-2"
          style={{ borderBottom: '1px solid var(--glass-border)' }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="fw-semibold text-truncate">{libro.titulo}</div>
            <small className="text-truncate d-block" style={{ opacity: 0.75 }}>
              {libro.autor?.nombre}
            </small>
          </div>

          <Form.Check
            type="switch"
            id={`disponible-${libro.id}`}
            label={libro.disponible ? 'Disponible' : 'No disponible'}
            checked={libro.disponible}
            disabled={ocupado === libro.id}
            onChange={() => cambiarDisponible(libro)}
            style={{ minWidth: 140 }}
          />

          <Button
            variant="outline-danger"
            size="sm"
            disabled={ocupado === libro.id}
            onClick={() => eliminar(libro)}
          >
            Eliminar
          </Button>
        </div>
      ))}
    </div>
  );
}
