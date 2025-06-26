import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaUserClock, FaCalendarAlt, FaClock, FaClinicMedical, FaHospitalAlt } from 'react-icons/fa';
import './CitaDetalle.css';

function CitaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Obtener citas desde localStorage
  const citas = JSON.parse(localStorage.getItem('citas')) || [];
  const cita = citas.find(c => c.id === id);

  if (!cita) {
    return (
      <div className="detalle-container">
        <h2>No se encontró una cita con ese ID.</h2>
        <button onClick={() => navigate('/citas')} className="btn-regresar">
          <FaArrowLeft /> Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="detalle-container">
      <h2>Detalles de la Cita</h2>
      <div className="cita-card">
        <div className="cita-nombre">
          <FaUser /> <span>{cita.nombre}</span>
        </div>
        <div className="cita-info"><FaUserClock /> Edad: {cita.edad} años</div>
        <div className="cita-info"><FaCalendarAlt /> Turno: {cita.turno}</div>
        <div className="cita-info"><FaCalendarAlt /> Fecha: {cita.fecha}</div>
        <div className="cita-info"><FaClock /> Hora: {cita.hora}</div>
        <div className="cita-info"><FaClinicMedical /> Consultorio: {cita.consultorio}</div>
        <div className="cita-info"><FaHospitalAlt /> Ubicación del seguro: {cita.ubicacionSeguro}</div>
      </div>

      <button onClick={() => navigate('/citas')} className="btn-regresar">
        <FaArrowLeft /> Volver a la lista
      </button>
    </div>
  );
}

export default CitaDetalle;
