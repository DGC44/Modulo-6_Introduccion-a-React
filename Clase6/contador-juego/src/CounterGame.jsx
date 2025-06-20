import React, { useReducer, useRef, useEffect, useCallback, useState } from "react";
import "./CounterGame.css";

const initialState = { count: 0, history: [] };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + action.amount,
        history: [...state.history, `+${action.amount} (Nuevo valor: ${state.count + action.amount})`],
      };
    case "decrement":
      return {
        count: state.count - 1,
        history: [...state.history, `-1 (Nuevo valor: ${state.count - 1})`],
      };
    case "reset":
      return initialState;
    case "undo": {
    if (state.history.length === 0) return state;
    // Deshacer último cambio
    const newHistory = state.history.slice(0, -1);
    const lastEntry = newHistory[newHistory.length - 1];

    // Validamos que lastEntry exista y que el match no sea null
    let newCount = 0;
    if (lastEntry) {
      const match = lastEntry.match(/Nuevo valor: (-?\d+)/);
      newCount = match ? Number(match[1]) : 0;
    }

    return { count: newCount, history: newHistory };
  }
    case "load":
      // Cargar estado desde payload
      return action.state || initialState;
    default:
      return state;
  }
}

function CounterGame() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const incrementBtnRef = useRef(null);
  const [incrementValue, setIncrementValue] = useState(1);

  useEffect(() => {
    incrementBtnRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("counterState", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("counterState"));
    if (savedState) {
      dispatch({ type: "load", state: savedState });
    }
  }, []);

  const handleIncrement = useCallback(() => {
    dispatch({ type: "increment", amount: Number(incrementValue) });
  }, [incrementValue]);

  const handleDecrement = useCallback(() => {
    dispatch({ type: "decrement" });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const handleUndo = useCallback(() => {
    dispatch({ type: "undo" });
  }, []);

  return (
    <div className="counter-container">
      <h2 className="counter-title">Contador: {state.count}</h2>

      <div className="input-group">
        <label htmlFor="incrementInput" className="input-label">
          Incrementar por:
        </label>
        <input
          id="incrementInput"
          type="number"
          value={incrementValue}
          onChange={(e) => setIncrementValue(e.target.value)}
          className="input-number"
          min={1}
        />
      </div>

      <div className="button-group">
        <button
          ref={incrementBtnRef}
          onClick={handleIncrement}
          className="btn increment-btn"
        >
          +
        </button>
        <button onClick={handleDecrement} className="btn decrement-btn">
          -
        </button>
        <button onClick={handleReset} className="btn reset-btn">
          Reset
        </button>
        <button onClick={handleUndo} className="btn undo-btn">
          Deshacer
        </button>
      </div>

      <h3 className="history-title">Historial de cambios:</h3>
      <ul className="history-list">
        {state.history.length === 0 ? (
          <li className="history-empty">No hay cambios aún.</li>
        ) : (
          state.history.map((entry, idx) => (
            <li key={idx} className="history-item">
              {entry}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default CounterGame;