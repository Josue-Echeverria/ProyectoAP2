import React from "react";
import { useParams } from "react-router-dom";
import "./ProyectDetail.css";

const ProyectDetails = () => {
  const { proyectId } = useParams();

  // Simulación de datos del proyecto (puede ser reemplazado por una API)
  const proyect = {
    id: proyectId,
    name: "Proyecto de Ejemplo",
    description:
      "Este es un proyecto de ejemplo con todos los detalles importantes. Ideal para mostrar cómo funciona esta pantalla.",
    price: 45.99,
    stock: 10,
    image: "https://via.placeholder.com/400", // Imagen de muestra
  };

  return (
    <div className="proyect-details-container">
      <div className="proyect-image">
        <img src={proyect.image} alt={proyect.name} />
      </div>
      <div className="proyect-info">
        <h2>{proyect.name}</h2>
        <p>{proyect.description}</p>
        <span className="proyect-price">${proyect.price.toFixed(2)}</span>
        <p className="proyect-stock">
          {proyect.stock > 0 ? `${proyect.stock} en stock` : "Sin stock"}
        </p>
        <button className="add-to-cart-button">Agregar al carrito</button>
      </div>
    </div>
  );
};

export default ProyectDetails;
