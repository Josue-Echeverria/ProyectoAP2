import React from "react";
import "./UserItem.css";

const UserItem = ({ user }) => {
  return (
    <div className="user-item">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Numero de teléfono: {user.phone}</p>
      <p>Saldo: {user.wallet}</p>
      
      { user.isActive ? (
        <button className="deactivate-button">Desactivar cuenta</button>
      ):(
        <button className="reactivate-button">Reactivar cuenta</button>
      )}
    </div>
  );
};

export default UserItem;
