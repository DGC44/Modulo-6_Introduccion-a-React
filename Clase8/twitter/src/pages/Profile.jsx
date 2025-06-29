// src/pages/Profile.jsx
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaHome, FaUserCircle } from "react-icons/fa";

const Profile = ({ user }) => {
  if (!user) {
    return (
      <div className="container">
        <h2>Acceso denegado</h2>
        <p>Debes iniciar sesión para ver tu perfil.</p>
        <Link to="/login">Iniciar sesión</Link>
      </div>
    );
  }

  return (
    <div className="twitter-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Twitter</h2>
        <Link to="/">
          <FaHome /> Inicio
        </Link>
        <Link to="/profile">
          <FaUserCircle /> Perfil
        </Link>
        <Link to="/login">
          <FaSignOutAlt /> Cerrar sesión
        </Link>
      </aside>

      {/* Perfil */}
      <main className="feed">
        <header className="feed-header">
          <FaUserCircle /> Perfil de @{user.username}
        </header>
        <div className="profile-info">
          <p><strong>Nombre de usuario:</strong> {user.username}</p>
          <p><strong>Miembro desde:</strong> Junio 2025</p>
          {/* Aquí podrías mostrar más información del usuario en el futuro */}
        </div>
      </main>
    </div>
  );
};

export default Profile;
