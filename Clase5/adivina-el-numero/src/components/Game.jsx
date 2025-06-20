import React, { useState } from 'react';
import InputNumber from './InputNumber';
import Message from './Message';
import RestartButton from './RestartButton';

function Game() {
  const [numeroSecreto, setNumeroSecreto] = useState(generarNumero());
  const [intento, setIntento] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [ganado, setGanado] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [historial, setHistorial] = useState([]); // 👈 nuevo estado para lista

  function generarNumero() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const manejarIntento = (valor) => {
    const numero = Number(valor);
    if (!numero || numero < 1 || numero > 100) return; // validación opcional

    setIntento(valor);
    setIntentos(prev => prev + 1);
    setHistorial(prev => [...prev, numero]); // 👈 guardar en historial

    if (numero === numeroSecreto) {
      setMensaje('🎉 ¡Correcto!');
      setGanado(true);
    } else if (numero < numeroSecreto) {
      setMensaje('🔼 El número es mayor');
    } else {
      setMensaje('🔽 El número es menor');
    }
  };

  const reiniciarJuego = () => {
    setNumeroSecreto(generarNumero());
    setIntento('');
    setMensaje('');
    setGanado(false);
    setIntentos(0);
    setHistorial([]); // 👈 limpiar historial
  };

  return (
    <div className="container">
      <h1>Adivina el Número</h1>
      <InputNumber valor={intento} onChange={manejarIntento} disabled={ganado} />
      <Message mensaje={mensaje} />
      <p>Intentos: {intentos}</p>
      {historial.length > 0 && (
        <div>
          <h3>Historial de intentos:</h3>
          <ul>
            {historial.map((num, index) => (
              <li key={index}>Intento {index + 1}: {num}</li>
            ))}
          </ul>
        </div>
      )}
      {ganado && <RestartButton onClick={reiniciarJuego} />}
    </div>
  );
}

export default Game;
