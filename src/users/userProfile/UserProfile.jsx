import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Header from "../../Header/Header";
import { getProjectByName, getAllDonations, getUser, updatePassword } from "../../api/api";
import ProyectItem from "../../proyect/proyectItem/ProyectItem";
import DonationList from "../../proyect/donations/donationList/DonationList";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ userData }) => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [editableData, setEditableData] = useState(userData);
    const [projects, setProjects] = useState(null);
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [donations, setDonations] = useState(null);
    const currentUser = localStorage.getItem("username");

    const customStyles = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: '20%',
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
    const submitForm = async (e) => {
        e.preventDefault();
        updatePassword(currentUser, newPassword);
        navigate('/login');
        closeForm();
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
                <div className="user-profile">
                    <h2>Mi información</h2> 
                    <div className="user-info">
                        <p><strong>Nombre:</strong> {editableData.name}</p>
                        <p><strong>Email:</strong> {editableData.email}</p>
                        <p><strong>Área de trabajo:</strong> {editableData.workArea}</p>
                        <p><strong>Cantidad inicial de dinero en cartera:</strong> ₡{editableData.wallet}</p>
                        <p><strong>Teléfono:</strong> {editableData.phone}</p>
                    </div>
                    <button onClick={openForm} className="reactivate-button">Cambiar contraseña</button>
                    <Modal 
                        isOpen={formIsOpen}
                        onRequestClose={closeForm}
                        contentLabel="Mentorship Form"
                        style={customStyles}
                    >
                        <form className='form1' onSubmit={submitForm}>
                            <div className="question">
                                <label>Contraseña actual:</label>
                                <input 
                                    name="password" 
                                    value={password}
                                    type="password"
                                    onChange={(e)=>{setPassword(e.target.value)}}
                                    required    
                                ></input>
                            </div>
                            <div className="question">
                                <label>Nueva contraseña:</label>
                                <input 
                                    name="newPassword"   
                                    value={newPassword}
                                    type="password"
                                    onChange={(e)=>{setNewPassword(e.target.value)}}
                                    required    
                                ></input>
                            </div>
                            <button type="submit" className='send-button' >Enviar</button>
                        </form>
                        <button onClick={closeForm} className='close'>X</button>
                    </Modal>
                </div>
                <div className="my-projects-container">
                    <h2>Mis proyectos</h2>
                    <div className="my-project-list">
                        {projects && projects.map((project) => (
                            <ProyectItem key={project._id} project={project} itsMine={true}/>
                        ))}
                    </div>
                </div>
                <div className="donations-containe">
                    <h2>Lista de Donaciones</h2>
                        <DonationList />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;