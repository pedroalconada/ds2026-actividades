import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "react-bootstrap";

export default function PrivateRoute({ rol }: { rol?: string }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return <Spinner animation="border" />;
  if (!usuario) return <Navigate to="/login" replace />;
  if (rol && usuario.rol !== rol) return <Navigate to="/sin-permiso" replace />;
  
  return <Outlet />;
}