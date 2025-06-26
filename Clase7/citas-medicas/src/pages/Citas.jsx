import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


function Citas() {
  const [citas, setCitas] = useState([]);
  const location = useLocation(); // Detecta cambio de ruta

  useEffect(() => {
    const storedCitas = JSON.parse(localStorage.getItem('citas')) || [];
    setCitas(storedCitas);
  }, [location]); // ← se recarga cada vez que vienes desde otra ruta

  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    setCitas(nuevasCitas);
    localStorage.setItem('citas', JSON.stringify(nuevasCitas));
  };

  return (
    <div className="citas-container">
      <h2>Lista de Citas</h2>

      {citas.length === 0 ? (
        <p>No hay citas registradas. Registra una nueva cita desde el menú.</p>
      ) : (
        <ul className="lista-citas">
          {citas.map((cita) => (
            <li key={cita.id} className="cita-item">
              <div className="cita-info">
                <div className="datos-cita">
                  <strong>{cita.nombre}</strong> — {cita.fecha} a las {cita.hora}
                </div>
                <div className="acciones">
                  <Link to={`/cita/${cita.id}`} className="btn-detalles">
                    Ver detalles
                  </Link>
                  <button onClick={() => eliminarCita(cita.id)} className="btn-eliminar">
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Citas;
