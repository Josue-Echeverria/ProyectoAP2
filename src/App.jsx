import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './login/Login';
import Register from './register/Register';
import ProyectList from './proyect/proyectList/ProyectList';
import ProyectDetails from './proyect/proyectDetail/ProyectDetail';
import CreateProject from './proyect/createProject/CreateProject';
import UserProfile from './users/userProfile/UserProfile';
import Admin from './admin/Admin';
import Mentorship from './mentorship/mentorshipsInfo/Mentorship';
import Home from './home/Home';
import Donar from './proyect/donations/DonaraProyecto/Donar';
import Eventos from './eventos/EventoList/EventoList';
import Agendar from './mentorship/agendar/Agendar';
function App() {
  const userData = {
    name: 'harlen',
    email: 'jehaeviaejroiqgmail.com', 
    password: '1234', 
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/proyect" element={<ProyectList />} />
        <Route path="/proyect/:id" element={<ProyectDetails />} />
        <Route path="/createProject" element={<CreateProject/>} />
        <Route path='/profile' element={<UserProfile userData={userData} />} />
        <Route path='/mentorship' element={<Mentorship />} />
        <Route path='/home' element={<Home />} />
        <Route path='/donar' element={<Donar userData={userData}/>} />
        <Route path='/eventos' element={<Eventos />} />
        <Route path='/agendar/:user' element={<Agendar />} />
        {/* ADMIN */}
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </div>
  );
}

export default App;