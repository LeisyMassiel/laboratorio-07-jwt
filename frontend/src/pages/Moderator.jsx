import { useEffect, useState } from "react";
import { getProtectedContent } from "../services/authService";

function Moderator() {
  const [contenido, setContenido] = useState("");

  useEffect(() => {
    getProtectedContent("mod")
      .then((data) => setContenido(data))
      .catch(() => {
        setContenido("No tiene permisos de moderador");
      });
  }, []);

  return (
    <div className="container">
      <h2>Panel de Moderador</h2>

      <p>{contenido}</p>
    </div>
  );
}

export default Moderator;