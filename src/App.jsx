import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './login/Login';
import Register from './register/Register';
import ProyectList from './proyect/proyectList/ProyectList';
import ProyectDetails from './proyect/proyectDetail/ProyectDetail';
import CreateProject from './createProject/CreateProject';
import DonationList from './proyect/donations/donationList/DonationList';
import Stats from './stats/Stats';
import UserList from './users/userList/UserList';
import ProyectList from './proyectList/ProyectList';
import ProyectDetails from './proyectDetail/ProyectDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/proyect" element={<ProyectList />} />
        <Route path="/proyect/:id" element={<ProyectDetails />} />
        <Route path="/createProject" element={<CreateProject/>} />
        {/* ADMIN */}
        <Route path="/donations" element={<DonationList/>} />
        <Route path="/users" element={<UserList/>} />
        <Route path="/stats" element={<Stats/>} />
      </Routes>
    </div>
  );
}

export default App;
