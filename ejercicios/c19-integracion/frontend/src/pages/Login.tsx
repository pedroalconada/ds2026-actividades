import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
import { guardarToken } from "../services/sesion";
import { loginSchema } from "../schemas/loginSchema";

interface LoginResponse {
  token: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    rol: "ADMIN" | "CLIENTE";
  };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    const validacion = loginSchema.safeParse({ email, password });
    if (!validacion.success) {
      setErrorMsg(validacion.error.issues[0].message);
      return;
    }

    try {
      const data = await apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      guardarToken(data.token);
      navigate("/");
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: "1rem" }}>
      <h2>Iniciar Sesión</h2>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>
          Ingresar
        </button>
      </form>
    </div>
  );
}