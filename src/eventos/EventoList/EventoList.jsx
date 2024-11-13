import React, { useState, useEffect } from "react";
import "./EventoItem.css";
import EventoItem from "../EventoItem/EventoItem";
import { getAllEvents, addEvento } from "../../api/api";
import Header from "../../Header/Header";
import Modal from "react-modal";

Modal.setAppElement('#root'); // Establecer el root para accesibilidad

const EventoList = () => {
  const [events, setEvents] = useState(null); // State to store events
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const [imagePreview, setImagePreview] = useState(null); // Estado para manejar la previsualización de la imagen
  const [imageUrl, setImageUrl] = useState(""); // Estado para manejar la URL de la imagen
  const [materialLink, setMaterialLink] = useState(""); // Estado para manejar el enlace del material

  const handleImageChange = (e) => {
    const fileUrl = e.target.value;
    setImageUrl(fileUrl);

    // Si el link de la imagen es válido, actualizar la previsualización
    if (fileUrl) {
      setImagePreview(fileUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleMaterialLinkChange = (e) => {
    setMaterialLink(e.target.value);
  };

  const openModal = () => setIsModalOpen(true); // Abre el modal
  const closeModal = () => setIsModalOpen(false); // Cierra el modal

  const handleRegister = () => {
    openModal(); // Abre el modal al hacer clic en "Registrarse"
  };

  const handleSubmitEvent = async (eventData) => {
    try {
      // Llamamos a la función addEvento para enviar los datos a la base de datos
      const newEvent = await addEvento(
        eventData.name,
        eventData.modalidad,
        eventData.date,
        eventData.imageUrl,
        eventData.materialLink,
        "creadorID" // Puedes reemplazar esto con el ID del usuario que está creando el evento
      );
      
      console.log("Evento creado exitosamente:", newEvent);
  
      // Actualiza la lista de eventos después de crear uno nuevo
      fetchEvents();
      
      // Cierra el modal
      closeModal();
    } catch (error) {
      console.error("Error al crear el evento:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const eventsData = await getAllEvents(); // Fetch the events
      console.log(eventsData); // Verifica si los datos son correctos
      setEvents(eventsData); // Set the events in the state
    } catch (error) {
      console.error("Error in fetchEvents:", error);
    }
  };

  useEffect(() => {
    fetchEvents(); // Call the fetch function on component mount
  }, []); // Run once on mount

  return (
    <div>
      <Header />
      <div className="event-list-container">
        <h2>Lista de Eventos</h2>
        <div className="event-list">
          {events &&
            events.map((event) => <EventoItem key={event._id} event={event} />)}
        </div>
        </div>      
        {/* Botón para abrir el modal */}
        <button onClick={openModal} className="create-event-btn">
          Crear Evento
        </button>

        {/* Modal para crear un evento */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Crear Evento"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <h2>Crear Evento</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newEvent = {
                name: e.target.name.value,
                modalidad: e.target.modalidad.value,
                date: e.target.date.value,
                imageUrl: imageUrl, // Enviar el link de la imagen
                materialLink: materialLink, // Enviar el enlace del material
              };
              handleSubmitEvent(newEvent); // Llamamos a la función para manejar el envío del evento
            }}
          >
            <div>
              <label>Nombre del Evento:</label>
              <input type="text" name="name" required />
            </div>
            <div>
              <label>Modalidad:</label>
              <input type="text" name="modalidad" required />
            </div>
            <div>
              <label>Fecha:</label>
              <input type="date" name="date" required />
            </div>
            <div>
              <label>Logo (URL):</label>
              <input
                type="text"
                name="image"
                value={imageUrl}
                onChange={handleImageChange}
                placeholder="Pega aquí el link de la imagen"
              />
              {imagePreview && (
                <div>
                  <h4>Vista previa de la imagen:</h4>
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <label>Enlace del Material:</label>
              <input
                type="text"
                name="material"
                value={materialLink}
                onChange={handleMaterialLinkChange}
                placeholder="Pega aquí el link del material"
              />
            </div>
            <div>
              <button type="submit">Crear Evento</button>
              <button type="button" onClick={closeModal}>
                Cancelar
              </button>
            </div>
          </form>
        </Modal>
    </div>
  );
};

export default EventoList;
  