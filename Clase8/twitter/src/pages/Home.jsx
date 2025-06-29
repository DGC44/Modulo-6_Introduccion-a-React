// src/pages/Home.jsx
import { Link, useNavigate } from "react-router-dom";
import TweetFeed from "./TweetFeed";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const Home = ({ user, logout }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container">
        <h1>Bienvenido a Twitter Clone</h1>
        <p>Para ver tu línea de tiempo, inicia sesión.</p>
        <button onClick={() => navigate("/login")}>Iniciar sesión</button>
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
        <button onClick={logout}>
          <FaSignOutAlt /> Cerrar sesión
        </button>
      </aside>

      {/* Main Feed */}
      <main className="feed">
        <header className="feed-header">
          <FaUserCircle /> @{user.username}
        </header>
        <TweetFeed user={user} />
      </main>
    </div>
  );
};

export default Home;
