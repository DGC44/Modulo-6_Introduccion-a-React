import { useState } from "react";
import "./ListaCompras.css";

function ListaCompras() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState("");

  const agregarProducto = () => {
    const productoLimpio = nuevoProducto.trim();
    if (productoLimpio !== "") {
      setProductos([...productos, { nombre: productoLimpio, comprado: false }]);
      setNuevoProducto("");
    }
  };

  const eliminarProducto = (index) => {
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
  };

  const toggleComprado = (index) => {
    const nuevosProductos = productos.map((producto, i) =>
      i === index ? { ...producto, comprado: !producto.comprado } : producto
    );
    setProductos(nuevosProductos);
  };

  return (
    <div className="container">
      <h2>🛒 Lista de Compras</h2>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Agregar producto..."
          value={nuevoProducto}
          onChange={(e) => setNuevoProducto(e.target.value)}
          className="input"
          onKeyDown={(e) => {
            if (e.key === "Enter") agregarProducto();
          }}
        />
        <button onClick={agregarProducto} className="botonAgregar">
          ➕ Agregar
        </button>
      </div>
      <ul className="lista">
        {productos.map((producto, index) => (
          <li
            key={index}
            className={`item ${producto.comprado ? "comprado" : ""}`}
          >
            <span
              className="icono"
              onClick={() => toggleComprado(index)}
              title={producto.comprado ? "Marcar como pendiente" : "Marcar como comprado"}
              style={{ cursor: "pointer", marginRight: "10px", userSelect: "none" }}
            >
              {producto.comprado ? "✅" : "🛒"}
            </span>
            <span className="nombre">{producto.nombre}</span>

            {/* Mostrar botón eliminar solo si NO está comprado */}
            {!producto.comprado && (
              <button
                onClick={() => eliminarProducto(index)}
                className="eliminar"
                title="Eliminar producto"
              >
                ❌
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCompras;
