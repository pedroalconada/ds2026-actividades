import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { libroSchema, LibroValidado, LibroInput } from '../schemas/libroSchema';
import { apiFetch } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { Autor } from '../types/libro';

export default function LibroNuevo() {
  const navigate = useNavigate();
  const [errorServidor, setErrorServidor] = useState<string | null>(null);
  const { data: autores, loading: cargandoAutores, error: errorAutores } = useFetch<Autor[]>('/autores');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LibroInput, any, LibroValidado>({
    resolver: zodResolver(libroSchema),
    defaultValues: {
      disponible: true,
      imagen: 'https://via.placeholder.com/150',
    },
  });

  const onSubmit = async (data: LibroValidado) => {
    setErrorServidor(null);
    try {
      await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      navigate('/catalogo');
    } catch (err: any) {
      setErrorServidor(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="container py-4" style={{ maxWidth: 480 }}>
      <h2>Nuevo libro</h2>

      {errorServidor && <Alert variant="danger">{errorServidor}</Alert>}
      {errorAutores && <Alert variant="warning">Error al cargar autores: {errorAutores}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          {...register('titulo')}
          isInvalid={!!errors.titulo}
        />
        <Form.Control.Feedback type="invalid">
          {errors.titulo?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        {cargandoAutores ? (
          <div><Spinner animation="border" size="sm" /> Cargando autores...</div>
        ) : (
          <Form.Select
            {...register('autorId')}
            isInvalid={!!errors.autorId}
          >
            <option value="">Seleccione un autor</option>
            {(autores ?? []).map((autor) => (
              <option key={autor.id} value={autor.id}>
                {autor.nombre}
              </option>
            ))}
          </Form.Select>
        )}
        <Form.Control.Feedback type="invalid">
          {errors.autorId?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          {...register('precio')}
          isInvalid={!!errors.precio}
        />
        <Form.Control.Feedback type="invalid">
          {errors.precio?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>URL de Imagen</Form.Label>
        <Form.Control
          {...register('imagen')}
          isInvalid={!!errors.imagen}
        />
        <Form.Control.Feedback type="invalid">
          {errors.imagen?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Check
        className="mb-3"
        label="Disponible"
        {...register('disponible')}
      />

      <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Agregar libro'}
      </Button>
    </Form>
  );
}