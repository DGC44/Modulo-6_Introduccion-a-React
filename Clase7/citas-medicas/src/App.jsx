import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Citas from './pages/Citas';
import CitaDetalle from './pages/CitaDetalle';
import RegistrarCita from './pages/RegistrarCita'; // NUEVO
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/citas">Ver Citas</Link>
        <Link to="/registrar">Registrar Cita</Link> {/* NUEVO */}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/cita/:id" element={<CitaDetalle />} />
        <Route path="/registrar" element={<RegistrarCita />} /> {/* NUEVO */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
