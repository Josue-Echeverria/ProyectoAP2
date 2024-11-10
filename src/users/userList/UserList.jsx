import React from "react";
import UserItem from "../userItem/UserItem";
import "./UserList.css";
import { getAllUsers } from "../../api/api";

const UserList = (props) => {
  const [users, setUsers] = React.useState([]);
  async function fetchUsers() {
    const data = await getAllUsers();
    setUsers(data);
  }

  React.useEffect(() => {
    if(props.getMentors)
      fetchMentors();
    else
      fetchUsers();

  }, []);
  // TODO fetch mentors from the API
  async function fetchMentors() {
    const data = await getAllUsers();
    setUsers(data);
  }

  return (
    <div className="user-list-container">
      {props.getMentors ? (<h2>Lista de Mentores</h2>):(<h2>Lista de Usuarios</h2>)}
      <div className="user-list">
        {users.map((user) => (
          props.getMentors ? (
            <UserItem key={user.id} user={user} asMentor={true}/>
          ) : (
            <UserItem key={user.id} user={user} asMentor={false}/>
          )
        ))}
      </div>
    </div>
  );
};

export default UserList;
