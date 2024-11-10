import React from "react";
import "./UserItem.css";

const UserItem = ({ user , asMentor}) => {
  return (
    <div className="user-item">
      <h3>{user.name}</h3>
      {asMentor ? (
        <>
          <p> {user.workArea}</p> 
          <p>Experiencia: </p> 
          <p>   {user.experience}</p> 
          <p>Precio: {user.price}</p>
          <button className="reactivate-button">Contratar</button>
        </>
      ) : (
        <>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>Saldo: {user.wallet}</p>
          { user.isActive ? (
            <button className="deactivate-button">Desactivar cuenta</button>
          ):(
            <button className="reactivate-button">Reactivar cuenta</button>
          )}
        </>
      )}
    </div>
  );
};

export default UserItem;
