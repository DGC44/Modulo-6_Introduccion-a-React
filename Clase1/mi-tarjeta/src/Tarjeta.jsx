import { useState } from 'react';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

function Tarjeta({ nombre, profesion, mensaje, email, telefono, redes = [] }) {
  const [mostrarMas, setMostrarMas] = useState(false);

  // Mapea el nombre de la red a su ícono correspondiente
  const iconosRedes = {
    linkedin: <FaLinkedin style={{ color: '#0A66C2', marginRight: '5px' }} />,
    instagram: <FaInstagram style={{ color: '#C13584', marginRight: '5px' }} />,
    facebook: <FaFacebook style={{ color: '#1877F2', marginRight: '5px' }} />,
  };

  return (
    <div className="tarjeta" onClick={() => setMostrarMas(!mostrarMas)} style={{ cursor: 'pointer' }}>
      <h2 className="nombre">{nombre}</h2>
      <h4 className="profesion">{profesion}</h4>
      <p className="mensaje">{mensaje}</p>

      {mostrarMas && (
        <>
          <p className="contacto">
            <MdEmail style={{ verticalAlign: 'middle', marginRight: '6px', color: '#2980b9' }} />
            {email}
          </p>
          <p className="contacto">
            <MdPhone style={{ verticalAlign: 'middle', marginRight: '6px', color: '#2980b9' }} />
            {telefono}
          </p>
          <div className="redes">
            {redes.map(({ nombre, url }) => (
              <a
                key={nombre}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: '10px', color: '#2980b9', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
              >
                {iconosRedes[nombre.toLowerCase()] || null} {nombre.charAt(0).toUpperCase() + nombre.slice(1)}
              </a>
            ))}
          </div>
        </>
      )}

      <small style={{ display: 'block', marginTop: '10px', fontSize: '0.8rem', color: '#888' }}>
        Haz clic en la tarjeta para {mostrarMas ? 'ocultar' : 'ver'} más información
      </small>
    </div>
  );
}

export default Tarjeta;
