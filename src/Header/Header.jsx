import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <header className="header">
      {props.isAdmin ? (
        <div className="header-content">
          <a href="#default" className="logo">
            Crowdfunding Admin
          </a>
          <a href="login" className="logout">
            Cerrar sesión
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
            <a href="/mentorship">
              Mentoria
            </a>
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
    </header>
  );
}

export default Header;
