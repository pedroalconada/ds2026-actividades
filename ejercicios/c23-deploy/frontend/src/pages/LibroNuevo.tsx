import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { libroSchema, LibroValidado, LibroInput } from '../schemas/libroSchema';
import { apiFetch } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { Autor } from '../types/libro';

export default function LibroNuevo() {
  const navigate = useNavigate();
  const [errorServidor, setErrorServidor] = useState<string | null>(null);
  const { data: autores } = useFetch<Autor[]>('/autores');

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
      const nombreAutor = data.autor.trim();
      const autorExistente = (autores ?? []).find(
        (a) => a.nombre.toLowerCase() === nombreAutor.toLowerCase()
      );

      let autorId: number | undefined = autorExistente?.id;
      if (!autorId) {
        try {
          const nuevoAutor = await apiFetch<Autor>('/autores', {
            method: 'POST',
            body: JSON.stringify({
              nombre: nombreAutor,
              nacionalidad: 'Desconocida',
            }),
          });
          autorId = nuevoAutor.id;
        } catch {
          // Si el endpoint de autores falla o ya existe, dejamos que el backend lo resuelva
        }
      }

      await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify({
          titulo: data.titulo,
          precio: data.precio,
          imagen: data.imagen,
          disponible: data.disponible,
          autorId,
          autor: nombreAutor,
        }),
      });

      navigate('/catalogo');
    } catch (err: any) {
      setErrorServidor(err.message);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 540 }}>
      <div className="glass-container">
        <h2 className="section-title mb-4">Nuevo Libro</h2>

        {errorServidor && <Alert variant="danger">{errorServidor}</Alert>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              {...register('titulo')}
              isInvalid={!!errors.titulo}
              placeholder="Ej. El Señor de los Anillos"
            />
            <Form.Control.Feedback type="invalid">
              {errors.titulo?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              {...register('autor')}
              isInvalid={!!errors.autor}
              placeholder="Ej. J.R.R. Tolkien"
              list="autores-sugeridos"
              autoComplete="off"
            />
            {autores && (
              <datalist id="autores-sugeridos">
                {autores.map((a) => (
                  <option key={a.id} value={a.nombre} />
                ))}
              </datalist>
            )}
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
              placeholder="Ej. 15000"
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
              placeholder="/img/harryPotter1.jpg"
            />
            <Form.Control.Feedback type="invalid">
              {errors.imagen?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Check
            className="mb-4"
            label="Disponible"
            {...register('disponible')}
          />

          <Button variant="primary" type="submit" disabled={isSubmitting} style={{ width: "100%" }}>
            {isSubmitting ? 'Guardando...' : 'Agregar libro'}
          </Button>
        </Form>
      </div>
    </div>
  );
}