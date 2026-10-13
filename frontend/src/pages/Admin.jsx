import { useEffect, useState } from "react";
import { getProtectedContent } from "../services/authService";

function Admin() {
  const [contenido, setContenido] = useState("");

  useEffect(() => {
    getProtectedContent("admin")
      .then((data) => setContenido(data))
      .catch(() => {
        setContenido("No tiene permisos de administrador");
      });
  }, []);

  return (
    <div className="container">
      <h2>Panel de Administrador</h2>

      <p>{contenido}</p>
    </div>
  );
}

export default Admin;