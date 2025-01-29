import React, { useState } from 'react';
import axios from 'axios';
import '../../css/agregarServicio.css'; 
const ServicioForm = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tiempoEstimado, setTiempoEstimado] = useState('');
  const [message, setMessage] = useState('');  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    try {
      const response = await axios.post('/agregar-servicio', {
        nombre,
        precio,
        descripcion,
        tiempo_estimado: tiempoEstimado,
      }, {
        headers: {
          'X-CSRF-TOKEN': token,
          'Content-Type': 'application/json',
        },
      });

      console.log('Servicio agregado:', response.data);
      setTimeout(() => window.location.reload(), 1000); 
      setMessage('Servicio agregado correctamente!');
      

    } catch (error) {
      console.error('Error al agregar servicio:', error);
      setMessage('Error al agregar servicio.'); 
    }
  };

  return (
    <div>
      <form className="servicio-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tiempoEstimado">Tiempo Estimado:</label>
          <input
            type="text"
            id="tiempoEstimado"
            value={tiempoEstimado}
            onChange={(e) => setTiempoEstimado(e.target.value)}
            required
          />
        </div>
        <button className="submit-btn" type="submit">Agregar Servicio</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ServicioForm;
