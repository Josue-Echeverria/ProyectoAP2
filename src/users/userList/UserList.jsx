import React from "react";
import UserItem from "../userItem/UserItem";
import "./UserList.css";

const UserList = () => {
  const users = [
    { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "Admin" },
    { id: 2, name: "María García", email: "maria@example.com", role: "User" },
    { id: 3, name: "Carlos López", email: "carlos@example.com", role: "User" },
    { id: 4, name: "Ana Torres", email: "ana@example.com", role: "Admin" },
  ];

  return (
    <div className="user-list-container">
      <h2>Lista de Usuarios</h2>
      <div className="user-list">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
