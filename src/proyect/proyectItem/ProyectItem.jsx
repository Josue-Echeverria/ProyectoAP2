import React,{ useState }  from "react";
import "./ProyectItem.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { updateProject } from "../../api/api";
const ProyectItem = ({ project, itsMine }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [goal, setGoal] = useState(project.goal);
  const [endDate, setEndDate] = useState(project.endDate);
  const [logo, setLogo] = useState(project.logo);
  
  const [formIsOpen, setFormIsOpen] = useState(false);

  const customStyles = {
    content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    },
  };
  const openForm = () => {
    setFormIsOpen(true);
  };
  const closeForm = () => {
      setFormIsOpen(false);
  };
  
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject( name, description, goal, endDate, logo);
    closeForm();
    navigate('/profile');
    // setDescription(description);
    // setGoal(goal);
    // setEndDate(endDate);
    // setLogo(logo);
    // setName(name)
  }
  return (
    <div className="proyect-item">
      <div className="namePencil">
        <h3>{name}</h3>
        {itsMine && <i className="fa-solid fa-pencil" onClick={openForm}></i>}
        <Modal 
          isOpen={formIsOpen}
          onRequestClose={closeForm}
          contentLabel="Modify project Form"
          style={customStyles}
        >
        <div className="modify-container">
          <h2>Editando proyecto</h2>
          <form className="create-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Nombre del proyecto</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled
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
              Confirmar
            </button>
          </form>
        </div>
        </Modal>
      </div>
      <p>{description}</p>
      <span className="proyect-price">Goal: ${goal.toFixed(2)}</span>
      <span className="gathered-amount">Gathered: ${project.gathered.toFixed(2)}</span>
      <img src={logo} alt={`${name} logo`} />
      <p className="end-date">End Date: {endDate}</p>
    </div>
  );
};

export default ProyectItem;
