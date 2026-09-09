import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { libroSchema, LibroValidado, LibroInput } from '../schemas/libroSchema';
import { apiFetch } from '../services/api';

export default function LibroNuevo() {
  const navigate = useNavigate();
  const [errorServidor, setErrorServidor] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LibroInput, any, LibroValidado>({
    resolver: zodResolver(libroSchema),
    defaultValues: { disponible: true },
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
        <Form.Control
          {...register('autor')}
          isInvalid={!!errors.autor}
        />
        <Form.Control.Feedback type="invalid">
          {errors.autor?.message}
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