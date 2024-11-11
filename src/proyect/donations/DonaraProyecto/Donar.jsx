import React, { useState, useEffect } from "react";
import Header from "../../../Header/Header";
import "./Donar.css";

const Donar = ({ userData }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]); // Estado para los proyectos filtrados
  const [donationAmount, setDonationAmount] = useState({});
  const [balance, setBalance] = useState(userData.initialBalance); // Inicializamos con `initialBalance`
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

  useEffect(() => {
    const initialProjects = [
      { id: 1, name: "Proyecto 1", description: "Descripción del proyecto 1" },
      { id: 2, name: "Proyecto 2", description: "Descripción del proyecto 2" },
      { id: 3, name: "Proyecto 3", description: "Descripción del proyecto 3" },
      { id: 4, name: "Proyecto 4", description: "Descripción del proyecto 4" },
      { id: 5, name: "Proyecto 5", description: "Descripción del proyecto 5" },
      { id: 6, name: "Proyecto 6", description: "Descripción del proyecto 6" },
    ];
    setProjects(initialProjects);
    setFilteredProjects(initialProjects); // Inicializa los proyectos filtrados
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Filtra los proyectos en función del término de búsqueda
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
      setBalance(balance - amount); // Actualiza el saldo
      alert(`Has donado ₡${amount} al ${projects.find(p => p.id === projectId).name}`);
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
              <p>{project.description}</p>
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
