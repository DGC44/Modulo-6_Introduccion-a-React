import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrarCita.css';

function RegistrarCita() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    turno: 'Matutino',
    fecha: '',
    hora: '',
    consultorio: '',
    ubicacionSeguro: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nuevasCitas = JSON.parse(localStorage.getItem('citas')) || [];
    const nuevaCita = { id: Date.now().toString(), ...formData };
    nuevasCitas.push(nuevaCita);
    localStorage.setItem('citas', JSON.stringify(nuevasCitas));
    navigate('/citas');
  };

  return (
    <div className="registro-container">
      <h2>Registrar Nueva Cita</h2>
      <form onSubmit={handleSubmit} className="formulario-cita">
        <div className="campo">
          <label>Nombre completo</label>
          <input name="nombre" onChange={handleChange} required />
        </div>

        <div className="campo">
          <label>Edad</label>
          <input name="edad" type="number" onChange={handleChange} required />
        </div>

        <div className="campo">
          <label>Turno</label>
          <select name="turno" onChange={handleChange}>
            <option value="Matutino">Matutino</option>
            <option value="Vespertino">Vespertino</option>
          </select>
        </div>

        <div className="campo">
          <label>Fecha</label>
          <input name="fecha" type="date" onChange={handleChange} required />
        </div>

        <div className="campo">
          <label>Hora</label>
          <input name="hora" type="time" onChange={handleChange} required />
        </div>

        <div className="campo">
          <label>Número de consultorio</label>
          <input name="consultorio" onChange={handleChange} required />
        </div>

        <div className="campo">
          <label>Ubicación del seguro</label>
          <input name="ubicacionSeguro" onChange={handleChange} required />
        </div>

        <button type="submit">Guardar Cita</button>
      </form>
    </div>
  );
}

export default RegistrarCita;
