import React, { useState, useEffect }  from "react";
import ProyectItem from "../proyectItem/ProyectItem";
import { getAllProjects } from "../api/api";
import "./ProyectList.css";

const ProyectList = async() => {
  const [projects, setProjects] = useState([]); // State to store projects

  const fetchProjects = async () => { // Keep this function async
    try {
      const projectsData = await getAllProjects(); // Fetch the projects
      setProjects(projectsData); // Set the projects in the state
    } catch (error) {
      console.error('Error in fetchProjects:', error);
    }
  };

  useEffect(() => {
    fetchProjects(); // Call the fetch function on component mount
  }, []); // Run once on mount
  console.log('Current Projects State:', projects);

  return (
    <div className="proyect-list-container">
      <h2>Lista de Proyectos</h2>
      <div className="proyect-list">
        {projects.map((project) => (
          <ProyectItem key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProyectList;
