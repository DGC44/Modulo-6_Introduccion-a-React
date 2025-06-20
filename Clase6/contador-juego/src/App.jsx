import React from "react";
import CounterGame from "./CounterGame"; // Importa tu componente contador

function App() {
  return React.createElement(
    "div",
    null,
    React.createElement(CounterGame, null)
  );
}

export default App;
