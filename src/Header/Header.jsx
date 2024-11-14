import React, { useEffect } from "react";
import "./Header.css";
import { getUser } from "../api/api";

function Header(props) {
  const currentuser = localStorage.getItem("username");
  const [isMentor, setIsMentor] = React.useState(false);

  const fetchUser = async () => {
    try {
      const userData = await getUser(currentuser);
      setIsMentor(userData[0].isMentor);
    } catch (error) {
      console.error("Error in fetchUser:", error);
    }
  }

  const handleCerrarSesion = () => {
    localStorage.removeItem("username");
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header className="header">
      {props.isAdmin ? (
        <div className="header-content">
          <a href="#default" className="logo">
            Crowdfunding Admin
          </a>
        </div>
      ) : (
        <div className="header-content">
          <a href="#default" className="logo">
            Crowdfunding
          </a>
          <div className="header-right">
            <a href="/home">
              Inicio
            </a>
            <a onClick={props.clickCreateForm} href="/CreateProject">
              Crear Proyecto
            </a>
            {isMentor ? (
              <a href="/Agenda">
                Agenda
              </a>
            ) : (
              <a href="/mentorship">
                Mentoria
              </a>
            )}       
            <a href="/donar">
              Donar a Proyecto
            </a>
            <a href="/eventos">
              Eventos
            </a>
            <a href="/profile">
              <i className="fa-solid fa-user"></i>
            </a>
          </div>
        </div>
      )}
      <a href="/login" onClick={handleCerrarSesion} className="logOut">
        Cerrar sesión
      </a>
    </header>
  );
}

export default Header;
