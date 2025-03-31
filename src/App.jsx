import React, { useState, useEffect } from "react"; // Importa el hook useState desde la librería react
import ProductList from "./components/ProductList"; // Importa el componente ProductList
import ProductForm from "./components/ProductForm"; // Importa el componente ProductForm
import "./index.css";

const App = () => { // Componente funcional App
  const [products, setProducts] = useState([]);
  const [theme, setTheme] = useState("light"); // Estado para el tema de la aplicación (light, dark, blue)  

  useEffect(() => { // Hook de efecto que se ejecuta al montar el componente
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.add(savedTheme);
  }, []);

  useEffect(() => { // Hook de efecto que se ejecuta al cambiar el estado de products
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product) => { // Función que agrega un producto al inventario
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const deleteProduct = (index) => { // Función que elimina un producto del inventario
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const editProduct = (index, newProduct) => { // Función que edita un producto del inventario
    const updatedProducts = products.map((product, i) =>
      i === index ? newProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const toggleTheme = () => { // Función que cambia el tema de la aplicación
    const newTheme = theme === "light" ? "dark" : theme === "dark" ? "blue" : theme === "blue" ? "red" : theme === "red" ? "purple" : "light"; // Cambia el tema actual al siguiente en el ciclo (light -> dark -> blue -> light) 
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return ( // Renderiza el formulario y la lista de productos
    <div className="container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Modo Oscuro" : theme === "dark" ? "🔵 Modo Azul" : theme === "blue" ? "🔴 Modo Rojo" : theme === "red" ? "🟣 Modo Púrpura" : "☀ Modo Claro"}
      </button>
      <h1>Inventario de Equipos de la USTA</h1>
      <ProductForm onAdd={addProduct} />
      <ProductList products={products} onDelete={deleteProduct} onEdit={editProduct} />
    </div>
  );
};

export default App;
