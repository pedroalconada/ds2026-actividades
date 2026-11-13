import { obtenerToken } from "./sesion";

const RAW_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const BASE = RAW_BASE.replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(
  ruta: string,
  opciones: RequestInit = {}
): Promise<T> {
  const token = obtenerToken();
  const path = ruta.startsWith("/") ? ruta : `/${ruta}`;

  const res = await fetch(`${BASE}${path}`, {
    ...opciones,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers,
    },
  });

  const cuerpo = await res.json().catch(() => null);

  if (res.status === 401 && token) {
    window.dispatchEvent(new Event("sesion-expirada"));
  }
  
  if (!res.ok) {
    throw new Error(cuerpo?.error ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}