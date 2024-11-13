import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProject.css";
import Header from "../../Header/Header";
import { addProject } from "../../api/api";
function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logo, setLogo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const creator = localStorage.getItem("username");
    addProject(name, description, goal, endDate, creator,logo);
    console.log({ name, description, goal, endDate, logo });
    navigate('/profile');
  };

  return (
    <div>
      <Header />

      <div className="create-container">
        <form className="create-form" onSubmit={handleSubmit}>
          <h2>Create Project</h2>
          <div className="input-group">
            <label htmlFor="name">Nombre del proyecto</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Descripción</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="goal">Goal</label>
            <input
              type="number"
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="endDate">Fecha final</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="logo">Enlace del logo</label>
            <input
              type="url"
              id="logo"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder="https://example.com/logo.png"
            />
          </div>

          {logo && (
            <div className="logo-preview">
              <p>Vista previa:</p>
              <img
                src={logo}
                alt="Logo preview"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            </div>
          )}

          <button type="submit" className="create-button">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
