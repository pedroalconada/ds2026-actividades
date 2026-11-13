import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
import { guardarToken } from "../services/sesion";
import { loginSchema } from "../schemas/loginSchema";
import { useAuth } from "../context/AuthContext";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const { login } = useAuth();

async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    const validacion = loginSchema.safeParse({ email, password });
    if (!validacion.success) {
      setErrorMsg(validacion.error.issues[0].message);
      return;
    }

    try {
      // 2. Le delegamos al contexto el POST y el guardado del token
      await login({ email, password });
      navigate("/");
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  } 


  return (
    <div className="container py-5" style={{ maxWidth: 440 }}>
      <div className="glass-container">
        <h2 className="section-title mb-4">Iniciar Sesión</h2>
        {errorMsg && (
          <div className="alert alert-danger mb-4" role="alert">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="admin@libreria.test"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}