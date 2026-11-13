import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactoSchema, ContactoFormValues, ASUNTOS } from '../schemas/contactoSchema';

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactoFormValues>({
    resolver: zodResolver(contactoSchema),
    defaultValues: { asunto: '' as ContactoFormValues['asunto'] },
  });

  const asunto = watch('asunto');

  const onSubmit = async () => {
    setEnviado(true);
    reset();
  };

  return (
    <div className="container py-5 contacto-form" style={{ maxWidth: 540 }}>
      <div className="glass-container">
        <h2 className="section-title mb-4">Contacto</h2>

        {enviado && (
          <Alert variant="success" onClose={() => setEnviado(false)} dismissible>
            ¡Gracias! Recibimos tu mensaje y te responderemos a la brevedad.
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-3" controlId="contacto-nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              {...register('nombre')}
              isInvalid={!!errors.nombre}
              placeholder="Ingresa tu nombre"
            />
            <Form.Control.Feedback type="invalid">{errors.nombre?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="contacto-email">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              {...register('email')}
              isInvalid={!!errors.email}
              placeholder="tucorreo@ejemplo.com"
            />
            <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="contacto-asunto">
            <Form.Label>Asunto</Form.Label>
            <Form.Select
              {...register('asunto')}
              isInvalid={!!errors.asunto}
              className={!asunto ? 'select-placeholder' : undefined}
            >
              <option value="" disabled>Seleccioná un asunto</option>
              {ASUNTOS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.asunto?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="contacto-mensaje">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              {...register('mensaje')}
              isInvalid={!!errors.mensaje}
              placeholder="¿En qué podemos ayudarte?"
            />
            <Form.Control.Feedback type="invalid">{errors.mensaje?.message}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isSubmitting} style={{ width: '100%' }}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </Form>
      </div>
    </div>
  );
}
