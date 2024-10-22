import React from "react";
import "./ProyectItem.css";

const ProyectItem = ({ proyect }) => {
  return (
    <div className="proyect-item">
      <h3>{proyect.name}</h3>
      <p>{proyect.description}</p>
      <span className="proyect-price">${proyect.price.toFixed(2)}</span>
    </div>
  );
};

export default ProyectItem;
