import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setMensaje("Ingrese su nombre de usuario");
      return;
    }

    if (!password.trim()) {
      setMensaje("Ingrese su contraseña");
      return;
    }

    try {
      await login(username, password);

      navigate("/");
      window.location.reload();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <main className="page">
      <section className="card">
        <h2>Bienvenido</h2>

        <p className="subtitle">
          Inicia sesión para acceder a tu cuenta.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>

            <input
              type="text"
              placeholder="Ingrese su usuario"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>

            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <button
            className="primary-button"
            type="submit"
          >
            Iniciar sesión
          </button>
        </form>

        {mensaje && (
          <div className="message">
            {mensaje}
          </div>
        )}
      </section>
    </main>
  );
}

export default Login;