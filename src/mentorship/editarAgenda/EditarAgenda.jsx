import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import "./EditarAgenda.css";
import { createSlot, getSlots, getBookedSlots } from "../../api/api";

// Función para formatear la fecha de yyyy-mm-dd a dd-mm-yyyy
function formatFecha(fecha) {
  const [year, month, day] = fecha.split("-");
  return `${day}-${month}-${year}`;
}

function parseFecha(fecha) {
  // Convertir fecha de "dd-mm-yyyy" a un objeto Date para comparaciones
  const [day, month, year] = fecha.split("-");
  return new Date(`${year}-${month}-${day}`);
}

function EditarAgenda() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Función para obtener todas las citas desde el servidor
  const cargarSlots = async () => {
    try {
      const mentorName = localStorage.getItem("username");
      const slots = await getSlots(mentorName);
      if (slots && slots.length > 0) {
        setAgenda(slots);
      } else {
        setAgenda([]);
      }
    } catch (error) {
      console.error("Error al obtener las citas:", error);
    }
  };

  // Función para obtener todas las citas agendadas
  const cargarBookedSlots = async () => {
    try {
      const mentorName = localStorage.getItem("username");
      const response = await getBookedSlots(mentorName);
      if (response && response.length > 0) {
        setBookedSlots(response);
      } else {
        setBookedSlots([]);
      }
    } catch (error) {
      console.error("Error al obtener las citas agendadas:", error);
    }
  };

  // Llamar a cargarSlots cuando el componente se monte
  useEffect(() => {
    cargarSlots();
    cargarBookedSlots();
  }, []);

  // Manejar la adición de nuevas horas a la agenda y la creación del slot
  const handleAgregarHora = async () => {
    if (fecha && hora) {
      try {
        const mentorName = localStorage.getItem("username");
        const fechaFormateada = formatFecha(fecha);

        console.log("mentorName:", mentorName);
        console.log("fecha:", fechaFormateada);
        console.log("hora:", hora);

        const response = await createSlot(mentorName, fechaFormateada, hora);
        await cargarSlots();
      } catch (error) {
        console.error("Error al agregar la cita:", error);
        setMensaje("Hubo un error al intentar crear la cita");
      }
    } else {
      setMensaje("Por favor, ingresa una fecha y hora válidas");
    }
  };

  // Ordenar agenda y citas agendadas por fecha y hora
  const sortedAgenda = [...agenda].sort((a, b) => {
    const dateA = parseFecha(a.date);
    const dateB = parseFecha(b.date);
    if (dateA.getTime() === dateB.getTime()) {
      return a.time.localeCompare(b.time);
    }
    return dateA - dateB;
  });

  const sortedBookedSlots = [...bookedSlots].sort((a, b) => {
    const dateA = parseFecha(a.slots.date);
    const dateB = parseFecha(b.slots.date);
    if (dateA.getTime() === dateB.getTime()) {
      return a.slots.time.localeCompare(b.slots.time);
    }
    return dateA - dateB;
  });

  return (
    <div className="editar-agenda-container">
      <Header />
      <div className="agenda-content">
        {/* Columna izquierda para seleccionar fecha y hora */}
        <div className="left-panel">
          <h2>Agregar nueva cita</h2>
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <label htmlFor="hora">Hora:</label>
          <input
            type="time"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />

          <button onClick={handleAgregarHora}>Agregar</button>
          <p className="mensaje">{mensaje}</p>
        </div>

        {/* Columna derecha para mostrar campos reservados */}
        <div className="right-panel">
          <h2>Agenda Disponible</h2>
          {sortedAgenda.length > 0 ? (
            <ul>
              {sortedAgenda.map((item, index) => (
                <li key={index}>
                  {item.date} - {item.time}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay reservas disponibles</p>
          )}
        </div>

        {/* Columna para mostrar citas agendadas */}
        <div className="booked-slots">
          <h2>Citas Agendadas</h2>
          {sortedBookedSlots.length > 0 ? (
            <ul>
              {sortedBookedSlots.map((item, index) => (
                <li key={index}>
                  {item.slots.date} - {item.slots.time} - Reservado por:{" "}
                  {item.slots.bookedBy}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay citas agendadas</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditarAgenda;
