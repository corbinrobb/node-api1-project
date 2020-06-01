import React from 'react';
import axios from 'axios';

const User = ({ name, bio, id, setUsers, users, setEditing }) => {

  const deleteUser = () => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <h2>{name}</h2>
      <p>{bio}</p>
      <button onClick={() => setEditing({ name, bio, id })}>Edit</button>
      <button onClick={deleteUser}>Delete</button>
    </div>
  );
}

export default User;