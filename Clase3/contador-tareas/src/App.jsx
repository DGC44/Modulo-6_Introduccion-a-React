import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

console.log("App se está renderizando...");

function App() {
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [filtroDuracion, setFiltroDuracion] = useState(0);
  const [ordenReciente, setOrdenReciente] = useState(false);

  // Guardar tareas en localStorage
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]);

  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`;
  }, [tareas]);

  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        id: Date.now(),
        nombre: nuevaTarea,
        duracion: parseInt(duracion),
        timestamp: Date.now()
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const tareasFiltradas = useMemo(() => {
    let filtradas = tareas.filter(t => t.duracion >= filtroDuracion);
    if (ordenReciente) {
      filtradas = [...filtradas].sort((a, b) => b.timestamp - a.timestamp);
    }
    return filtradas;
  }, [tareas, filtroDuracion, ordenReciente]);

  return (
    <div className="contenedor">
      <h1>Contador de Tareas</h1>

      <div className="formulario">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nombre de la tarea"
        />
        <input
          type="number"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          placeholder="Duración en minutos"
        />
        <button onClick={agregarTarea}>Agregar tarea</button>
      </div>

      <div className="filtros">
        <label>
          Filtrar por duración mínima:
          <input
            type="number"
            value={filtroDuracion}
            onChange={(e) => setFiltroDuracion(parseInt(e.target.value))}
          />
        </label>

        <label>
          Ordenar por recientes:
          <input
            type="checkbox"
            checked={ordenReciente}
            onChange={() => setOrdenReciente(!ordenReciente)}
          />
        </label>
      </div>

      <h2>Tareas</h2>
      <ul className="lista-tareas">
        {tareasFiltradas.map((tarea) => (
          <li key={tarea.id} className="tarea">
            <span>{tarea.nombre}: {tarea.duracion} min</span>
            <button onClick={() => eliminarTarea(tarea.id)} className="eliminar">🗑️</button>
          </li>
        ))}
      </ul>

      <h3>Total de tiempo: {calcularTiempoTotal} minutos</h3>
    </div>
  );
}

export default App;
