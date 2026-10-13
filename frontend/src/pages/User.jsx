import { useEffect, useState } from "react";
import { getProtectedContent } from "../services/authService";

function User() {
  const [contenido, setContenido] = useState("");

  useEffect(() => {
    getProtectedContent("user")
      .then((data) => setContenido(data))
      .catch(() => {
        setContenido("No tiene acceso a este contenido");
      });
  }, []);

  return (
    <div className="container">
      <h2>Panel de Usuario</h2>

      <p>{contenido}</p>
    </div>
  );
}

export default User;