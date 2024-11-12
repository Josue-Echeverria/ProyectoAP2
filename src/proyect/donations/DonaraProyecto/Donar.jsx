import React, { useState, useEffect } from "react";
import Header from "../../../Header/Header";
import "./Donar.css";
import { getAllProjects } from "../../../api/api";

const Donar = ({ userData }) => {
  const [projects, setProjects] = useState([]); // Estado para almacenar todos los proyectos
  const [filteredProjects, setFilteredProjects] = useState([]); // Estado para proyectos filtrados
  const [donationAmount, setDonationAmount] = useState({});
  const [balance, setBalance] = useState(userData.initialBalance); // Usando `initialBalance` del usuario
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const fetchProjects = async () => {
    try {
      const projectsData = await getAllProjects(); // Llamada a la API
      setProjects(projectsData); // Guardar los proyectos en el estado
      setFilteredProjects(projectsData); // Inicialmente mostrar todos los proyectos
    } catch (error) {
      console.error("Error in fetchProjects:", error);
    }
  };

  useEffect(() => {
    fetchProjects(); // Obtener los proyectos al montar el componente
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Filtrar proyectos según el término de búsqueda
    const filtered = projects.filter((project) =>
      project.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const handleDonationChange = (projectId, amount) => {
    if (amount <= balance) {
      setDonationAmount({ ...donationAmount, [projectId]: amount });
    } else {
      alert("La cantidad no puede ser mayor al saldo disponible.");
    }
  };

  const handleDonate = (projectId) => {
    const amount = donationAmount[projectId] || 0;
    if (amount > 0 && amount <= balance) {
      setBalance(balance - amount); // Actualizar el saldo
      alert(`Has donado ₡${amount} al proyecto ${filteredProjects.find(p => p.id === projectId).name}`);
      setDonationAmount({ ...donationAmount, [projectId]: 0 });
    } else {
      alert("Ingresa una cantidad válida para donar.");
    }
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
            <div key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <img src={project.logo} alt={`${project.name} logo`} className="project-image" />
              <p>{project.description}</p>
              <p>Meta: ₡{project.goal.toFixed(2)}</p>
              <p>Recaudado: ₡{project.gathered.toFixed(2)}</p>
              <p>Fecha de finalización: {project.endDate}</p>
              <div className="donation-section">
                <input
                  type="number"
                  placeholder="Cantidad a donar"
                  value={donationAmount[project.id] || ""}
                  onChange={(e) =>
                    handleDonationChange(project.id, parseInt(e.target.value, 10) || 0)
                  }
                  max={balance}
                />
                <button onClick={() => handleDonate(project.id)}>Donar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donar;
