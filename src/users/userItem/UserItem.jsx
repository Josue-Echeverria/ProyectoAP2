import React from "react";
import "./UserItem.css";
import { useNavigate } from "react-router-dom";
import { updateMentorStatus, toggleActive } from "../../api/api";

const UserItem = ({ user , asMentor}) => {

  const [userStatus, setUserStatus] = React.useState(user.isActive);

  const navigate = useNavigate();

  const truncateText = (text, maxLength) => {
    if(text){ 
      if (text.length <= maxLength) {
        return text;
      }
      return text.substring(0, maxLength) + "...";
    }
  };

  const handleAccept = async () => {
    try {
      navigate(`/agendar/${user.name}`);
    } catch (error) {
      console.error("Error updating mentor status:", error);
    }
  };

  const handleDeactivate = async () => {
    const response = await toggleActive(user.name, "deactivate");
    setUserStatus(false);
  }

  const handleReactivate = async () => {
    const response = await toggleActive(user.name,"activate");
    setUserStatus(true);
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
        </div>
      ) : (
        <div className="userInfo">
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>Saldo: {user.wallet}</p>
          {userStatus ? (
            <button className="deactivate-button" onClick={handleDeactivate}>Desactivar cuenta</button>
          ) : (
            <button className="reactivate-button" onClick={handleReactivate}>Reactivar cuenta</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserItem;
