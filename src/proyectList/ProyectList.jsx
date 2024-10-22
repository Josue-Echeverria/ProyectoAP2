import React from "react";
import ProyectItem from "../proyectItem/ProyectItem";
import "./ProyectList.css";

const ProyectList = () => {
  const proyects = [
    { id: 1, name: "Proyecto 1", price: 20.0, description: "Descripción del Proyecto 1" },
    { id: 2, name: "Proyecto 2", price: 35.5, description: "Descripción del Proyecto 2" },
    { id: 3, name: "Proyecto 3", price: 12.0, description: "Descripción del Proyecto 3" },
    { id: 4, name: "Proyecto 4", price: 50.0, description: "Descripción del Proyecto 4" },
  ];

  return (
    <div className="proyect-list-container">
      <h2>Lista de Proyectos</h2>
      <div className="proyect-list">
        {proyects.map((proyect) => (
          <ProyectItem key={proyect.id} proyect={proyect} />
        ))}
      </div>
    </div>
  );
};

export default ProyectList;
