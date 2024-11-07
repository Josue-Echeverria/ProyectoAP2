import React from "react";
import "./UserItem.css";

const UserItem = ({ user }) => {
  return (
    <div className="user-item">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <span className="user-role">{user.role}</span>
    </div>
  );
};

export default UserItem;
