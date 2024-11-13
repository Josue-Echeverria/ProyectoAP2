import React, {useState} from 'react';
import './EventoItem.css';


const EventoItem = ({event}) => {
    console.log(event);
    return (
        <div className="proyect-item">
          <img src={event.logo} alt={event.nombre} />
          <h3>{event.nombre}</h3>
          <p className="modalidad">Modalidad: {event.modalidad}</p>
          <p className="fecha">Fecha: {event.date}</p>
          <button>Registrarse</button>
          <a href={event.material} target="_blank" rel="noopener noreferrer">
            Descargar Material
          </a>
        </div>
      );
  };
  
  export default EventoItem;