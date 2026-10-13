import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [mensaje, setMensaje] = useState("");
  const [mostrarExito, setMostrarExito] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim().length < 3) {
      setMensaje("El usuario debe tener al menos 3 caracteres");
      return;
    }

    if (!email.includes("@")) {
      setMensaje("Ingrese un correo válido");
      return;
    }

    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      await register(
        username,
        email,
        password,
        role
      );

      setMensaje("");
      setMostrarExito(true);
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <main className="page">
      <section className="card">
        <h2>Crear cuenta</h2>

        <p className="subtitle">
          Completa tus datos para registrarte.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>

            <input
              type="text"
              placeholder="Ej. leisy"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>

            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>

            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Rol</label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            >
              <option value="user">
                Usuario
              </option>

              <option value="moderator">
                Moderador
              </option>

              <option value="admin">
                Administrador
              </option>
            </select>
          </div>

          <button
            className="primary-button"
            type="submit"
          >
            Crear cuenta
          </button>
        </form>

        {mensaje && (
          <div className="message">
            {mensaje}
          </div>
        )}
      </section>

      {mostrarExito && (
        <div className="modal-overlay">
          <div className="modal-success">
            <div className="success-icon">
              ✓
            </div>

            <h3>Registro exitoso</h3>

            <p>
              Tu usuario fue registrado correctamente.
            </p>

            <button
              className="modal-button"
              onClick={() => navigate("/login")}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Register;