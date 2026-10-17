import { it, expect, vi } from 'vitest';
import { AuthContext, type Rol, type Usuario } from '../../context/AuthContext';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyNavbar from './Navbar';

function renderHeader(usuario: Usuario | null) {
  const auth = {
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: string) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  };
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={auth}>
        <MyNavbar />
      </AuthContext.Provider>
    </MemoryRouter>,
  );
}

it('CLIENTE: saluda por nombre y NO ve "Nuevo libro"', () => {
  renderHeader({ id: 2, email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' });
  expect(screen.queryByText(/nuevo libro/i)).not.toBeInTheDocument();
});

it('ADMIN: ve el link "Nuevo libro"', () => {
  renderHeader({ id: 1, email: 'admin@libreria.test', nombre: 'Admin', rol: 'ADMIN' });
  expect(screen.getByRole('link', { name: /nuevo libro/i })).toBeInTheDocument();
});
