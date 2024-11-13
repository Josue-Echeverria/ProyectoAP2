import React, { useState, useEffect } from "react";
import Header from "../../../Header/Header";
import "./Donar.css";
import { getAllProjects, getUser } from "../../../api/api";
import ProyectItem from "../../proyectItem/ProyectItem";

const Donar = () => {
  const [projects, setProjects] = useState([]); // Estado para almacenar todos los proyectos
  const [filteredProjects, setFilteredProjects] = useState([]); // Estado para proyectos filtrados
  const [balance, setBalance] = useState(); // Usando `initialBalance` del usuario
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const currentUser = localStorage.getItem("username");

  const fetchProjects = async () => {
    try {
      const projectsData = await getAllProjects(); 
      setProjects(projectsData); 
      setFilteredProjects(projectsData); 
    } catch (error) {
      console.error("Error in fetchProjects:", error);
    }
  };

  const fetchUserWallet = async () => {
    try {
      const userData = await getUser(currentUser);
      console.log(userData);
      setBalance(userData[0].wallet);
    } catch (error) {
      console.error("Error in fetchUserWallet:", error);
    }
  }

  useEffect(() => {
    fetchProjects();
    fetchUserWallet();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = projects.filter((project) =>
      project.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProjects(filtered);
  };


  return (
    <div>
      <Header />
      <div className="donar-container">
        <h2>Explora Proyectos y Dona</h2>
        <p>Saldo disponible en la cartera: ₡{balance}</p>

        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar proyectos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />

        <div className="project-list">
          {filteredProjects.map((project) => (
            <ProyectItem toDonate={true} project={project} balance={balance} setBalance={setBalance}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donar;