import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initial = {
  name: '',
  bio: ''
};

const UserForm = ({ editing, setEditing, users, setUsers }) => {
  const [ userInfo, setUserInfo ] = useState(initial);

  useEffect(() => {
    if(editing) setUserInfo(editing);
  }, [editing])

  const handleInputChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    if(editing) {
      axios
        .put(`http://localhost:5000/api/users/${userInfo.id}`, userInfo)
        .then(res => {
          setUsers(users.map(user => {
            if(user.id === editing.id) {
              return userInfo
            }
            return user
          }));

          setEditing(false);
        })
    } else {
      axios
        .post(`http://localhost:5000/api/users/`, userInfo)
        .then(res => {
          setUsers([...users, res.data])
        })
    }

    setUserInfo(initial);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input 
        name="name"
        value={userInfo.name}
        onChange={handleInputChange}
      />
      <input
        name="bio"
        value={userInfo.bio}
        onChange={handleInputChange}
      />
      <button>{(editing) ? 'Edit User' : 'Add User'}</button>
    </form>
  );
}

export default UserForm;