import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Stats from '../stats/Stats';
import './Admin.css';
import ProyectItem from '../proyect/proyectItem/ProyectItem';
import { getAllProjects } from '../api/api';
import UserList from '../users/userList/UserList';
import DonationList from '../proyect/donations/donationList/DonationList';


const Admin = () => {
    const [projects, setProjects] = React.useState(null);
    
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
        <div className='adminScreen'>
            <Header isAdmin={true} />
            <Stats/>
            <div className="middle">
                <DonationList/>
                <UserList/>
            </div>
            <div className="my-proyect-container">
                <h1>Proyectos</h1>
                <div className="my-proyect-list">
                    {projects && projects.map((project) => (
                        <ProyectItem key={project._id} project={project} />
                    ))}    
                </div>
            </div>

        </div>
    );
};

export default Admin;