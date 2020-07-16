import React, { useState, useEffect } from 'react';

import axios from 'axios';
import UserList from './UserList';
import UserForm from './UserForm';

const App = () => {
  const [ editing, setEditing ] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <div className="app">
      <UserList users={users} setUsers={setUsers} setEditing={setEditing} />
      <UserForm editing={editing} setEditing={setEditing} users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;