import {Link, useNavigate} from "react-router-dom";
import {getCurrentUser, logout} from "../services/authService";

function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const roles = user?.roles || [];
  const isUser =
    roles.includes("ROLE_USER");
  const isModerator =
    roles.includes("ROLE_MODERATOR");
  const isAdmin =
    roles.includes("ROLE_ADMIN");
  const handleLogout = () => {
    logout();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav>
      <Link
        className="brand" to="/"> JWT Auth </Link>

      <Link to="/"> Inicio </Link>

      {isUser && (
        <Link to="/user"> Usuario </Link>
      )}

      {isModerator && (
        <Link to="/moderator"> Moderador </Link>
      )}

      {isAdmin && (
        <Link to="/admin"> Administrador </Link>
      )}

      {!user ? (
        <>
          <Link to="/login"> Iniciar sesión </Link>
          <Link to="/register"> Registrarse </Link>
        </>
      ) : (
        <button onClick={handleLogout}> Cerrar sesión </button>
       )}
    </nav>
  );
}

export default Navbar;