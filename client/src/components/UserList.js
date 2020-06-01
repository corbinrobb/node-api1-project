import React from 'react';
import User from './User';

const UserList = ({ users, setUsers, setEditing }) => {

  return (
    <>
      {users.map(user => {
        return <User key={user.id} {...user} users={users} setUsers={setUsers} setEditing={setEditing} />
      })}
    </>
  );
}

export default UserList;