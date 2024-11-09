import React from "react";
import UserItem from "../userItem/UserItem";
import "./UserList.css";
import { getAllUsers } from "../../api/api";

const UserList = () => {
  const [users, setUsers] = React.useState([]);
  async function fetchUsers() {
    const data = await getAllUsers();
    setUsers(data);
  }

  React.useEffect(() => {
    fetchUsers();
  }, []);
  
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
