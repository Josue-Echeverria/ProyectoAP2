import React from "react";
import UserItem from "../userItem/UserItem";
import "./UserList.css";
import { getAllUsers, getMentor } from "../../api/api";

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
    const data = await getMentor();
    setUsers(data);
  }

  return (
    props.getMentors ? (
      <div className="user-list-container">
        <h2>Lista de Mentores</h2>
        <div className="user-list">
          {users.map((user) => (
            <UserItem key={user.id} user={user} asMentor={true}/>
          ))}
        </div>
      </div>
    ):(
      <div className="user-container-admin-view">
        {props.getMentorsPending ? (
          <>
            <h2>Solicitudes de usuarios para ser mentores</h2>
            <div className="user-list-admin">
              {users.map((user) => (
                <UserItem key={user.id} user={user} asMentor={true}/>
              ))}
            </div>
          </>
        ):(
          <>
            <h2>Lista de Usuarios</h2>
            <div className="user-list-admin">
            {users.map((user) => (
              <UserItem key={user.id} user={user} asMentor={false}/>
            ))}
            </div>
          </>
        )}
      </div>
    )
       
  );
};

export default UserList;
