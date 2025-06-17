import React, { useState, useEffect, useRef } from 'react';

function Bitacora() {
  const [planetas, setPlanetas] = useState(
    JSON.parse(localStorage.getItem('bitacoraPlanetas')) || []
  );
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const inputImagenRef = useRef();

  useEffect(() => {
    localStorage.setItem('bitacoraPlanetas', JSON.stringify(planetas));
  }, [planetas]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoPlaneta = {
      nombre,
      descripcion,
      imagen: imagen ? URL.createObjectURL(imagen) : null,
    };

    setPlanetas([...planetas, nuevoPlaneta]);
    setNombre('');
    setDescripcion('');
    setImagen(null);

    if (inputImagenRef.current) inputImagenRef.current.value = '';
  };

  const handleDelete = (index) => {
    const copia = [...planetas];
    copia.splice(index, 1);
    setPlanetas(copia);
  };

  // Función placeholder para editar (puedes implementar después)
  const handleEditar = (index) => {
    alert(`Función editar no implementada aún. Planeta índice: ${index}`);
  };

  return (
    <div className="bitacora-container">
      <h1>Bitácora de Exploración</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del planeta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImagen(e.target.files[0])}
          ref={inputImagenRef}
        />
        <button type="submit">Guardar</button>
      </form>

      <div className="planetas-registrados">
        {planetas.map((planeta, index) => (
          <div key={index} className="planeta-tarjeta">
            <h3 className="planeta-titulo">{planeta.nombre}</h3>
            <p className="planeta-descripcion">{planeta.descripcion}</p>
            {planeta.imagen && (
              <img
                src={planeta.imagen}
                alt={planeta.nombre}
                className="planeta-imagen"
              />
            )}
            <div className="botones-tarjeta">
              <button onClick={() => handleEditar(index)}>Editar</button>
              <button onClick={() => handleDelete(index)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bitacora;
