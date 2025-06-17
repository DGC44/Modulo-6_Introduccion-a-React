import React, { useState, useEffect, useMemo } from 'react';
import Planeta from './Planeta';
import Bitacora from './Bitacora';
import './styles/panel.css';


function App() {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState('En órbita');
  const [planetasVisitados, setPlanetasVisitados] = useState([]);

  useEffect(() => {
    console.log("¡El panel de control está listo!");
    const vuelo = setInterval(() => {
      setDistancia((d) => d + 10);
      setCombustible((c) => Math.max(c - 5, 0));
    }, 1000);

    return () => {
      clearInterval(vuelo);
      console.log("El panel de control se ha apagado.");
    };
  }, []);

  useEffect(() => {
    console.log("¡Combustible actualizado!");
  }, [combustible]);

  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`;
  }, [estadoNave]);

  const aterrizar = () => {
    setEstadoNave('Aterrizando');
    const nuevoNombre = `Planeta ${planetasVisitados.length + 1}`;
    setPlanetasVisitados([...planetasVisitados, nuevoNombre]);
  };

  return (
    <div className="panel">
      <h1>Panel de Control</h1>
      <p>Distancia recorrida: {distancia} km</p>
      <p>Combustible restante: {combustible}%</p>
      <p>{mensajeEstado}</p>
      <button onClick={aterrizar}>Aterrizar</button>

      <h2>Planetas Visitados</h2>
      {planetasVisitados.map((nombre, index) => (
        <Planeta key={index} nombre={nombre} />
      ))}

      <hr />
      <Bitacora />
    </div>
  );
}

export default App;
