import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Header from "../../Header/Header";
import { getProjectByName, getAllDonations, getUser, updateUser } from "../../api/api";
import ProyectItem from "../../proyect/proyectItem/ProyectItem";
import DonationList from "../../proyect/donations/donationList/DonationList";

const UserProfile = ({ userData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState(userData);
    const [projects, setProjects] = useState(null);
    const [donations, setDonations] = useState(null);
    // TODO SET CURRENT USER
    const currentUser = 'harlen';


    const handleCambiarContraseña = () => {
        alert("Cambiar contraseña");
    }
    
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

    const fetchUser = async () => {
        try {
            const userData = await getUser(currentUser);
            console.log(userData);
            setEditableData(userData[0]);
        } catch (error) {
            console.error("Error in fetchUser:", error);
        }
    };

    const fetchProjects = async () => {
        try {
            const projectsData = await getProjectByName(currentUser);
            setProjects(projectsData);
        } catch (error) {
            console.error("Error in fetchProjects:", error);
        }
    };

    const fetchDonations = async () => {
        try {
            const donationsData = await getAllDonations();
            setDonations(donationsData);
        } catch (error) {
            console.error("Error in fetchDonations:", error);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchProjects();
        fetchDonations();
    }, []);

    return (
        <div>
            <Header />
            <div className="user-profile-container">
                {/* Contenedor de Mi Información */}
                <div className="user-profile">
                    <h2>Mi información</h2> 
                    <div className="user-info">
                        <p><strong>Nombre:</strong> {editableData.name}</p>
                        <p><strong>Email:</strong> {editableData.email}</p>
                        <p><strong>Área de trabajo:</strong> {editableData.workArea}</p>
                        <p><strong>Cantidad inicial de dinero en cartera:</strong> ₡{editableData.wallet}</p>
                        <p><strong>Teléfono:</strong> {editableData.phone}</p>
                    </div>
                    <button onClick={handleCambiarContraseña}>Cambiar contraseña</button>
                </div>

                {/* Contenedor de Mis Proyectos */}
                <div className="my-projects-container">
                    <h2>Mis proyectos</h2>
                    <div className="my-project-list">
                        {projects && projects.map((project) => (
                            <ProyectItem key={project._id} project={project} itsMine={true}/>
                        ))}
                    </div>
                </div>


                {/* Contenedor de Lista de Donaciones */}
                <div className="donations-containe">
                    <h2>Lista de Donaciones</h2>
                        <DonationList />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;