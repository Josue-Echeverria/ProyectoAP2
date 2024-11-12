import React from "react";
import "./UserItem.css";
import { updateMentorStatus } from "../../api/api";
const UserItem = ({ user , asMentor}) => {
  const truncateText = (text, maxLength) => {
    if(text){
      if (text.length <= maxLength) {
        return text;
      }
      return text.substring(0, maxLength) + "...";
    }
  };

  const handleAccept = async () => {
    const response = await updateMentorStatus(user.name, 1);
    console.log(response);
    window.location.reload();
  }

  const handleReject = async () => {
    const response = await updateMentorStatus(user.name, 0);
    console.log(response);
    window.location.reload();
  }

  return (
    <div className="user-item">
      
      <h3>{user.name}</h3>
      {asMentor ? (
        <div className="userInfo">
          <p>{user.workArea}</p>
          <p>{truncateText(user.experience, 85)}</p>
          <p>Precio: {user.price}</p>
          <button className="reactivate-button" onClick={handleAccept}>Aceptar</button>
          <button className="deactivate-button" onClick={handleReject}>Rechazar</button>
        </div>
      ) : (
        <div className="userInfo">
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>Saldo: {user.wallet}</p>
          {user.isActive ? (
            <button className="deactivate-button">Desactivar cuenta</button>
          ) : (
            <button className="reactivate-button">Reactivar cuenta</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserItem;
