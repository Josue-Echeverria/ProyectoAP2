import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Header from "../../Header/Header";
import {getAllProjects, getAllDonations} from "../../api/api";
import ProyectItem from "../../proyect/proyectItem/ProyectItem";
import DonationItem from "../../proyect/donations/donationItem/DonationItem";

const UserProfile = ({ userData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState(userData);
    const [projects, setProjects] = useState(null);
    const [donations, setDonations] = useState(null);   

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableData({ ...editableData, [name]: value });
    };

    const handleCancelClick = () => {
        setEditableData(userData);
        setIsEditing(false);
    };

    const fetchProjects = async () => { // Keep this function async
        try {
          const projectsData = await getAllProjects(); // Fetch the projects
          setProjects(projectsData); // Set the projects in the state
        } catch (error) {
          console.error('Error in fetchProjects:', error);
        }
      };
    const fetchDonations = async () => { // Keep this function async
        try {
            const donationsData = await getAllDonations(); // Fetch the donations
            setDonations(donationsData); // Set the donations in the state
        } catch (error) {
            console.error('Error in fetchDonations:', error);
        }
    };

      useEffect(() => {
        fetchProjects(); // Call the fetch function on component mount
        fetchDonations();
      }, []); // Run once on mount
    

    return (
        <div className="workspace">
            <Header  />
            <div className="user-profile">
                <div className="informacion-title">
                    <h1>Tu información</h1>
                    <i className="fa-solid fa-pencil" onClick={handleEditClick}></i>
                </div>
                <div className="user-info">
                    {isEditing ? (
                        <>
                            <p>
                                <strong>Nombre:</strong>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={editableData.fullName}
                                    onChange={handleChange}
                                />
                            </p>
                            <p>
                                <strong>Cedula:</strong>
                                <input
                                    type="text"
                                    name="id"
                                    value={editableData.id}
                                    onChange={handleChange}
                                />
                            </p>
                            <p>
                                <strong>Email:</strong>
                                <input
                                    type="text"
                                    name="email"
                                    value={editableData.email}
                                    onChange={handleChange}
                                />
                            </p>
                            <p>
                                <strong>Area de trabajo:</strong>
                                <input
                                    type="text"
                                    name="workArea"
                                    value={editableData.workArea}
                                    onChange={handleChange}
                                />
                            </p>
                            <p>
                                <strong>Cantidad inicial de dinero en cartera:</strong>
                                <input
                                    type="text"
                                    name="initialBalance"
                                    value={editableData.initialBalance}
                                    onChange={handleChange}
                                />
                            </p>
                            <p>
                                <strong>Teléfono:</strong>
                                <input
                                    type="text"
                                    name="phone"
                                    value={editableData.phone}
                                    onChange={handleChange}
                                />
                            </p>
                            <button onClick={handleEditClick}>Confirmar</button>
                            <button onClick={handleCancelClick}>Cancelar</button>
                        </>
                    ) : (
                        <>
                            <p><strong>Nombre:</strong> {editableData.fullName}</p>
                            <p><strong>Cedula:</strong> {editableData.id}</p>
                            <p><strong>Email:</strong> {editableData.email}</p>
                            <p><strong>Area de trabajo:</strong> {editableData.workArea}</p>
                            <p><strong>Cantidad inicial de dinero en cartera:</strong> ₡{editableData.initialBalance}</p>
                            <p><strong>Teléfono:</strong> {editableData.phone}</p>
                        </>
                    )}
                </div>
            </div>
            <div className="my-proyect-container">
                <h1>Mis proyectos</h1>
                <div className="my-proyect-list">
                    {projects && projects.map((project) => (
                        <ProyectItem key={project._id} project={project} />
                    ))}    
                </div>
            </div>
            <div className="donation-container">
                <h1>Mis donaciones</h1>
                <div className="my-donation-list">
                    {donations && donations.map((donation) => (
                        <DonationItem donation={donation} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;