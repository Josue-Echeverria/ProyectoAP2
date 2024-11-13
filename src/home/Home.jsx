import React from "react";
import Header from "../Header/Header";
import ProyectList from "../proyect/proyectList/ProyectList";

const Home = () => {
  return (
    <div className="proyect-list-container">
        <Header/>
        <ProyectList/>
    </div>
  );
};

export default Home;
