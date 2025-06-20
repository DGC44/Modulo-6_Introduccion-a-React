import React, { useReducer, useRef, useCallback } from "react";

const initialState = { products: [] };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      if (!action.name.trim()) return state;
      // Evitar agregar producto con nombre repetido (opcional)
      if (state.products.find(p => p.name.toLowerCase() === action.name.toLowerCase()))
        return state;
      return {
        products: [
          ...state.products,
          { id: Date.now(), name: action.name, quantity: 1 },
        ],
      };
    case "increment":
      return {
        products: state.products.map((p) =>
          p.id === action.id ? { ...p, quantity: p.quantity + 1 } : p
        ),
      };
    case "decrement":
      return {
        products: state.products.map((p) =>
          p.id === action.id && p.quantity > 1
            ? { ...p, quantity: p.quantity - 1 }
            : p
        ),
      };
    case "remove":
      return {
        products: state.products.filter((p) => p.id !== action.id),
      };
    case "clear":
      return initialState;
    default:
      return state;
  }
}

function InventoryManager() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);

  const handleAddProduct = useCallback(() => {
    const productName = inputRef.current.value;
    if (productName.trim() === "") return;
    dispatch({ type: "add", name: productName });
    inputRef.current.value = "";
    inputRef.current.focus();
  }, []);

  const handleIncrement = useCallback(
    (id) => {
      dispatch({ type: "increment", id });
    },
    []
  );

  const handleDecrement = useCallback(
    (id) => {
      dispatch({ type: "decrement", id });
    },
    []
  );

  const handleRemove = useCallback(
    (id) => {
      dispatch({ type: "remove", id });
    },
    []
  );

  const handleClear = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h2>Gestor de Inventario</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="Nombre del producto"
        style={{ padding: 8, width: "70%", marginRight: 8 }}
      />
      <button onClick={handleAddProduct} style={{ padding: "8px 12px" }}>
        Agregar Producto
      </button>
      <button
        onClick={handleClear}
        style={{ marginLeft: 10, padding: "8px 12px", backgroundColor: "#f44336", color: "white", border: "none" }}
      >
        Vaciar Inventario
      </button>

      <ul style={{ marginTop: 20, listStyle: "none", paddingLeft: 0 }}>
        {state.products.length === 0 && <li>No hay productos agregados.</li>}
        {state.products.map((product) => (
          <li
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span>
              {product.name} - Cantidad: {product.quantity}
            </span>
            <div>
              <button
                onClick={() => handleIncrement(product.id)}
                style={{ marginRight: 5 }}
              >
                +
              </button>
              <button
                onClick={() => handleDecrement(product.id)}
                style={{ marginRight: 5 }}
              >
                -
              </button>
              <button
                onClick={() => handleRemove(product.id)}
                style={{ backgroundColor: "#f44336", color: "white", border: "none" }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryManager;
