import React, { useState, useEffect }  from "react";
import ProyectItem from "../proyectItem/ProyectItem";
import { getAllProjects } from "../api/api";
import "./ProyectList.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

const ProyectList = () => {
  const [projects, setProjects] = useState(null); // State to store projects
  const navigate = useNavigate();


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

  return (
    <div className="proyect-list-container">
      <Header clickCreateForm={() => {
    navigate('/createProject')}}/>
      <h2>Lista de Proyectos</h2>
      <div className="proyect-list">
        {projects && projects.map((project) => (
          <ProyectItem key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProyectList;
