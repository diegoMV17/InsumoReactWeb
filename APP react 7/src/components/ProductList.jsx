import React, { useState, useEffect } from "react"; // Importa el hook useState desde la librería react  

const ProductList = ({ products, onDelete, onEdit }) => { // Componente funcional ProductList
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editSistemaOperativo, setEditSistemaOperativo] = useState("");
  const [editSerial, setEditSerial] = useState("");
  const [editActualizado, setEditActualizado] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editEntryDate, setEditEntryDate] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCancel();
      }
    };

    if (editIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editIndex]); // Se ejecuta cuando editIndex cambia

  const handleEdit = (index, product) => { // Función que maneja la edición de un producto
    setEditIndex(index);
    setEditValue(product.name);
    setEditCategory(product.category);
    setEditSistemaOperativo(product.sistemaOperativo);
    setEditSerial(product.serial);
    setEditActualizado(product.actualizado === "Actializado");
    setEditStatus(product.status === "Usado");
    setEditEntryDate(product.entryDate);
  };

  const handleSave = (index) => { // Función que maneja el guardado de la edición de un producto
    const today = new Date().toISOString().split("T")[0];
    if (editEntryDate > today) {
      alert("La fecha de ingreso no puede ser futura.");
      return;
    }

    if (editValue.trim() && editCategory.trim() && editEntryDate) {
      onEdit(index, { name: editValue, category: editCategory, sistemaOperativo: editSistemaOperativo, serial: editSerial, actualizado: editActualizado ? "Actializado" : "No Actualizado", status: editStatus ? "Usado" : "Nuevo", entryDate: editEntryDate });
      setEditIndex(null);
    }
  };

  const handleCancel = () => { // Función que maneja la cancelación de la edición de un producto
    setEditIndex(null);
    setEditValue("");
    setEditCategory("");
    setEditSistemaOperativo("");
    setEditSerial("");
    setEditActualizado(false);
    setEditStatus(false);
    setEditEntryDate("");
  };

  const handleClearSearch = () => { // Función que maneja la limpieza de la búsqueda
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
  };

  const filteredProducts = products.filter((product) => { // Filtra los productos según el término de búsqueda y el rango de fechas
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Compara el nombre del producto con el término de búsqueda
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sistemaOperativo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.serial.toString().includes(searchTerm.toLowerCase()) ||
      product.actualizado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateRange =
      (!startDate || product.entryDate >= startDate) &&
      (!endDate || product.entryDate <= endDate);

    return matchesSearch && matchesDateRange;
  });

  return ( // Lista de productos
    <div>
      <h2>Lista de Productos</h2>

      {/* Barra de búsqueda y filtro de fechas en una sola línea */}
      <div className="filter-container">   {/* Contenedor de la barra de búsqueda y filtro de fechas */}
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="date-filter"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="date-filter"
        />
        <button onClick={handleClearSearch} className="clear-btn">Limpiar</button>
      </div> {/* Fin del contenedor de la barra de búsqueda y filtro de fechas */}

      <ul> {/* Lista de productos */}
        {filteredProducts.map((product, index) => (
          <li key={index} className="product-item">
            <div className="product-content">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editSerial}
                    onChange={(e) => setEditSerial(e.target.value)}
                    placeholder="Serial"
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  >
                    <option value="">Seleccione la Sala</option>
                    <optgroup label="Edificio Giordano">
                      <option value="Sala 1E">Sala 1E</option>
                      <option value="Sala 2E">Sala 2E</option>
                      <option value="Sala 3E">Sala 3E</option>
                      <option value="Sala 4E">Sala 4E</option>
                      <option value="Sala 5E">Sala 5E</option>
                      <option value="Lab. Software">Lab. Software</option>
                    </optgroup>
                    <optgroup label="Edificio Santo Domingo">
                      <option value="Sala 1F">Sala 1F</option>
                      <option value="Sala 2F">Sala 2F</option>
                      <option value="Sala 3F">Sala 3F</option>
                      <option value="Sala 4F">Sala 4F</option>
                      <option value="Sala 5F">Sala 5F</option>
                    </optgroup>
                  </select>
                  <select
                    value={editSistemaOperativo}
                    onChange={(e) => setEditSistemaOperativo(e.target.value)}
                  >
                    <option value="">Selecione el sistema opetativo</option>
                    <optgroup label="version de Windows">
                      <option value="Windows 8">Windows 8</option>
                      <option value="Windows 10">Windows 10</option>
                      <option value="Windows 11">Windows 11</option>
                    </optgroup>
                    <optgroup label="version de Mac OS">
                      <option value="Mac OS Catalina">Mac OS Catalina</option>
                      <option value="Mac OS Big Sur">Mac OS Big Sur</option>
                      <option value="Mac OS Monterey">Mac OS Monterey</option>
                    </optgroup>
                    <optgroup label="version de Linux">
                      <option value="Ubuntu">Ubuntu</option>
                      <option value="Fedora">Fedora</option>
                      <option value="Debian">Debian</option>
                      <option value="kali">Kali</option>
                    </optgroup>
                  </select>
                  <label className="checkbox-container">
                    <input
                      type="checkbox" id="estado-equipo"
                      checked={editActualizado}
                      onChange={() => setEditActualizado(!editActualizado)}
                    />
                    Equipo Actualizado
                  </label>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={editStatus}
                      onChange={() => setEditStatus(!editStatus)}
                    />
                    Equipo Usado
                  </label>
                  <input
                    type="date"
                    value={editEntryDate}
                    onChange={(e) => setEditEntryDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </>
              ) : (
                <span>
                  {product.name} - <strong>{product.category}</strong> - {product.sistemaOperativo} - {product.serial} - {product.actualizado} - {product.status} - {product.entryDate}
                </span>
              )}
            </div>
            <div className="button-group">
              {editIndex === index ? (
                <>
                  <button className="save-btn" onClick={() => handleSave(index)}>Guardar</button>
                  <button className="cancel-btn" onClick={handleCancel}>Cancelar</button>
                </>
              ) : (
                <>
                  <button className="edit-btn" onClick={() => handleEdit(index, product)}>Editar</button>
                  <button className="delete-btn" onClick={() => onDelete(index)}>Eliminar</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
