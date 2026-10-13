import {
  useEffect,
  useState
} from "react";

function Home() {
  const [contenido, setContenido] =
    useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/test/all`)
      .then((response) => response.text())
      .then((data) => setContenido(data))
      .catch(() => {
        setContenido( "No se pudo conectar con el servidor");
      });
  }, []);

  return (
    <main className="page">
      <section className="card hero-card">
        <span className="hero-badge"> Seguridad con JWT </span>
        <h1> Autenticación y autorización </h1>
        <p> Aplicación desarrollada con React,Node.js, Express, Sequelize, MySQL
          y JSON Web Token.
        </p>

        <div className="status">
          API: {contenido}
        </div>
      </section>
    </main>
  );
}

export default Home;