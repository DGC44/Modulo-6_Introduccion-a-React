import React, { useReducer, useRef, useCallback, useState } from "react";
import "./App.css";

const initialState = { products: [] };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        products: [
          ...state.products,
          {
            id: Date.now(),
            name: action.name,
            quantity: 1,
            category: action.category || "General",
          },
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

const categories = ["General", "Liquidos", "Secos", "A granel", "Otros"];

function InventoryManager() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);
  const [category, setCategory] = useState("General");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [error, setError] = useState("");

  // Filtrar productos por búsqueda y categoría
  const filteredProducts = state.products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "Todas" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    const name = inputRef.current.value.trim();
    if (!name) {
      setError("Agrega el nombre de un producto.");
      return;
    }
    const duplicate = state.products.some(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicate) {
      setError("Este producto ya está en el inventario.");
      return;
    }
    dispatch({ type: "add", name, category });
    inputRef.current.value = "";
    setError("");
  };

  const handleClear = () => {
    if (
      window.confirm("¿Seguro que quieres vaciar todo el inventario? Esta acción no se puede deshacer.")
    ) {
      dispatch({ type: "clear" });
    }
  };

  const handleIncrement = useCallback(
    (id) => {
      dispatch({ type: "increment", id });
    },
    [dispatch]
  );

  const handleDecrement = useCallback(
    (id) => {
      dispatch({ type: "decrement", id });
    },
    [dispatch]
  );

  const handleRemove = useCallback(
    (id) => {
      dispatch({ type: "remove", id });
    },
    [dispatch]
  );

  return (
    <div className="inventory-container">
      <h2>Gestor de Inventario</h2>

      <div className="input-group">
        <input
          ref={inputRef}
          type="text"
          placeholder="Nombre del producto"
          className="input-product"
          aria-label="Nombre del producto"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Categoría del producto"
          className="input-category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick={handleAddProduct} className="btn btn-add">
          Agregar Producto
        </button>

        <button onClick={handleClear} className="btn btn-clear">
          Vaciar Inventario
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="search-group">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar productos"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          aria-label="Filtrar por categoría"
          className="input-category"
        >
          <option value="Todas">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <ul className="inventory-list">
        {filteredProducts.length === 0 && (
          <li className="no-products">No hay productos que mostrar.</li>
        )}

        {filteredProducts.map((product) => (
          <li
            key={product.id}
            className={`inventory-item ${
              product.quantity <= 5 ? "low-quantity" : ""
            }`}
          >
            <span className="product-info" title={`Categoría: ${product.category}`}>
              {product.name} - Cantidad: {product.quantity}
              {product.quantity <= 5 && (
                <span className="warning-text"> ¡Cantidad baja!</span>
              )}
            </span>

            <div className="product-actions">
              <button
                onClick={() => handleIncrement(product.id)}
                className="increment"
                aria-label={`Incrementar cantidad de ${product.name}`}
              >
                +
              </button>
              <button
                onClick={() => handleDecrement(product.id)}
                className="decrement"
                aria-label={`Disminuir cantidad de ${product.name}`}
              >
                -
              </button>
              <button
                onClick={() => handleRemove(product.id)}
                className="remove"
                aria-label={`Eliminar ${product.name}`}
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
