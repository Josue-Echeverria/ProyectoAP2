import React, { useState, useEffect } from "react";
import ProyectItem from "../proyectItem/ProyectItem";
import { getAllProjects } from "../../api/api";
import "./ProyectList.css";
import Header from "../../Header/Header";
import { useNavigate } from "react-router-dom";

const ProyectList = () => {
  const [projects, setProjects] = useState(null); // State to store projects
  const navigate = useNavigate();

  const fetchProjects = async () => { // Fetch the projects
    try {
      const projectsData = await getAllProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error("Error in fetchProjects:", error);
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch projects on mount
  }, []);

  return (
    <div className="proyect-list-container">
      <Header />
      <h2>Lista de Proyectos</h2>
      <div className="proyect-list">
        {projects &&
          projects.map((project) => (
            <ProyectItem key={project._id} project={project} />
          ))}
      </div>
    </div>
  );
};

export default ProyectList;
