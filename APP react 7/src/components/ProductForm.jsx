import React, { useState } from "react"; // Importa el hook useState desde la librería react 

const ProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState(""); // Estado para el nombre del producto
  const [category, setCategory] = useState("");
  const [sistemaOperativo, setSistemaOperativo] = useState("");
  const [serial, setSerial] = useState("");
  const [isUpdate, setActualizado] = useState(false);
  const [isUsed, setIsUsed] = useState(false); // Estado para el estado del producto
  const [entryDate, setEntryDate] = useState(""); // Estado para la fecha de ingreso

  const handleSubmit = (e) => { // función que maneja el evento de envío del formulario
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Validar que la fecha no sea futura
    const today = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
    if (entryDate > today) { // Compara la fecha de ingreso con la fecha actual
      alert("La fecha de ingreso no puede ser futura.");
      return;
    }

    if (product.trim() && category.trim()) {
      onAdd({ name: product, category, sistemaOperativo, serial, actualizado: isUpdate ? "Actializado" : "No Actualizado", status: isUsed ? "Usado" : "Nuevo", entryDate });
      setProduct("");
      setCategory("");
      setSistemaOperativo("");
      setSerial("");
      setActualizado(false);
      setIsUsed(false);
      setEntryDate("");
    }
  };

  return ( // Formulario para agregar un producto
    <form onSubmit={handleSubmit}>
      <div className="formulario-container">
        <input
          type="text"
          placeholder="Marca del Equipo"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="input-box"
        />
        <input
          type="number"
          placeholder="Serial numerico del Equipo"
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          className="input-box"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
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
        <select value={sistemaOperativo} onChange={(e) => setSistemaOperativo(e.target.value)} className="form-select">
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
        {/* Checkbox para estado del equipo */}
        <label class="checkbox-container">
          <input
            type="checkbox" id="estado-equipo"
            checked={isUpdate}
            onChange={() => setActualizado(!isUpdate)}
          />
          Equipo Actializado
        </label>
        <label class="checkbox-container">
          <input
            type="checkbox" id="estado-equipo"
            checked={isUsed}
            onChange={() => setIsUsed(!isUsed)}
          />
          Equipo Usado
        </label>
        <label>Fecha de ingreso del equipo:</label>
        <input
          type="date"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]} // Restringe fechas futuras
          className="fecha-box"
          required
        />
      </div >
      <button type="submit">Agregar</button>
    </form>
  ); // Fin del formulario
}; // Fin del componente ProductForm

export default ProductForm;
