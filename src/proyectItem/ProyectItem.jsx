import React from "react";
import "./ProyectItem.css";

const ProyectItem = ({ project }) => {
  return (
    <div className="proyect-item">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      //<span className="proyect-price">Goal: ${project.goal.toFixed(2)}</span>
      //<span className="gathered-amount">Gathered: ${project.gathered.toFixed(2)}</span>
      <img src={project.logo} alt={`${project.name} logo`} />
      <p>End Date: {project.endDate}</p>
    </div>
  );
};

export default ProyectItem;
