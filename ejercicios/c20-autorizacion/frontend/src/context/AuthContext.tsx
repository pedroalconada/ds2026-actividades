import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiFetch } from "../services/api";
import { obtenerToken, borrarToken } from "../services/sesion";

interface Usuario {
  id: number;
  email: string;
  nombre: string;
  rol: "ADMIN" | "CLIENTE";
}

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  tieneRol: (rol: string) => boolean;
  login: (datos: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(obtenerToken() !== null);

  useEffect(() => {
    if (!obtenerToken()) return;
    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(() => borrarToken())
      .finally(() => setCargando(false));
      

    const manejarExpiracion = () => logout();
    window.addEventListener('sesion-expirada', manejarExpiracion);
    return () => window.removeEventListener('sesion-expirada', manejarExpiracion);
  }, []);

  const login = async (datos: any) => {
    const res = await apiFetch<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(datos)
    });
    setUsuario(res.usuario);
  };
  const logout = () => {
    borrarToken();
    setUsuario(null);
  };
  return (
    <AuthContext.Provider value={{
      usuario,
      cargando,
      estaAutenticado: usuario !== null,
      tieneRol: (rol) => usuario?.rol === rol,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}