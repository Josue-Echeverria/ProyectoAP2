import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <header class="header">
      {props.isAdmin ? (
        <a href="login">
          Cerrar sesion
        </a>
        ):(
      <div >
        <a href="#default" class="logo">
          Crowdfunding
        </a>
        <div class="header-right">
          <a class="active" href="/home">
            Home
          </a>
          <a onClick={props.clickCreateForm}href="#Create Project">
            Create Project
          </a>
          <a href="/mentorship">
            Mentoria
          </a>
          <a href="/profile">
            <i class="fa-solid fa-user"></i>
          </a>
        </div>
      </div>
    )}
    </header>
  );
}

export default Header;
