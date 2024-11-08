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
import UserProfile from './users/userProfile/UserProfile';

function App() {
  const userData = {
    fullName: "John Doe",
    id: "123456",
    email: "jecheverria@estudiantec.cr",
    workArea: "Software Development",
    initialBalance: 1000,
    phone: "8888-8888"
  };
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
        {/* ADMIN */}
        <Route path="/donations" element={<DonationList/>} />
        <Route path="/users" element={<UserList/>} />
        <Route path="/stats" element={<Stats/>} />
      </Routes>
    </div>
  );
}

export default App;
