import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './login/Login';
import Register from './register/Register';
import ProyectList from './proyectList/ProyectList';
import ProyectDetails from './proyectDetail/ProyectDetail';
import CreateProject from './createProject/CreateProject';

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

      </Routes>
    </div>
  );
}

export default App;
