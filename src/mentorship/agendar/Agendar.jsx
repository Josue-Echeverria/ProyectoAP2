import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Header/Header";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Agendar.css";
import { getAppointments, getSlotsByDate, bookSlot } from "../../api/api";

const Agendar = () => {
  const [appointments, setAppointments] = useState([]); // Fechas con citas
  const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada
  const [availableTimes, setAvailableTimes] = useState([]); // Horas disponibles
  const [selectedTime, setSelectedTime] = useState(null); // Hora seleccionada
  const { user } = useParams();
  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments(user);
        const dates = data.map(appointment => appointment.date); // Extrae solo las fechas
        setAppointments(dates); // Guarda las fechas en el estado
        console.log("Fechas de citas en dates:", dates);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [user]);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reinicia la hora seleccionada al cambiar la fecha
    const day = date.getDate().toString().padStart(2, "0"); 
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`; 
    
    try {
      console.log("Fecha seleccionada:", formattedDate);
      const timesForDate = await getSlotsByDate(user, formattedDate);
      setAvailableTimes(timesForDate);
      console.log("Horas disponibles:", timesForDate);
    } catch (error) {
      console.error("Error fetching available times:", error);
      setAvailableTimes([]);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time); // Almacena la hora seleccionada
  };

  const handleBookSlot = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Selecciona una fecha y hora para agendar.");
      return;
    }

    const day = selectedDate.getDate().toString().padStart(2, "0");
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = selectedDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    try {
      await bookSlot(user, formattedDate, selectedTime, currentUser);
      alert("Cita agendada exitosamente.");

      // Elimina la hora agendada de las opciones disponibles
      setAvailableTimes(prevTimes => prevTimes.filter(time => time !== selectedTime));

      setSelectedTime(null); // Reinicia la selección de hora después de agendar
    } catch (error) {
      console.error("Error booking slot:", error);
      alert("Hubo un problema al agendar la cita.");
    }
  };

  // Añadir círculo verde para las fechas con citas disponibles
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const day = date.getDate().toString().padStart(2, "0"); 
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
      const year = date.getFullYear();

      const formattedDate = `${day}-${month}-${year}`; 
      if (appointments.includes(formattedDate)) {
        return <div className="circle-indicator"></div>; // Añade un círculo verde
      }
    }
    return null;
  };

  return (
    <div>
      <Header />
      <div className="calendar-appointment-container">
        <div className="calendar-container">
          <h2>Selecciona una Fecha para Ver Citas Disponibles</h2>
          {user && <p>Agendando para: <strong>{user}</strong></p>}
          
          {/* Calendario con fechas destacadas */}
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent} // Añadir contenido de tile personalizado
          />
        </div>

        {/* Mostrar horas disponibles para la fecha seleccionada */}
        <div className="appointment-times">
          {selectedDate && (
            <>
              <h3>Citas Disponibles para {selectedDate.toLocaleDateString()}</h3>
              {availableTimes && availableTimes.length > 0 ? (
                <ul>
                  {availableTimes.map((time, index) => (
                    <li
                      key={index}
                      onClick={() => handleTimeSelect(time)}
                      className={selectedTime === time ? "selected-time" : ""}
                      style={{ cursor: "pointer" }}
                    >
                      {time}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay citas disponibles para esta fecha.</p>
              )}

              {/* Botón de "Agendar" */}
              {selectedTime && (
                <button onClick={handleBookSlot} className="book-button">
                  Agendar
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agendar;
