const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const shortid = require('shortid');

const server = express();

server.use(bodyparser.json());

server.use(cors());

let users = [];

server.get('/api/users', (req, res) => {
  if (!req) res.status(500).json({ errorMessage: "The users information could not be retrieved." });
  res.send(users);
})

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  
  if(!name || !bio) {
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  } 
  if (users.find(user => user.name === name)) {
    return res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
  }
  
  const user = { id: shortid.generate(), name, bio };
  users.push(user);
  res.status(201).send(user);
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id == id);

  if(!id) {
    return res.status(500).json({ errorMessage: "The user information could not be retrieved." });
  }
  if(!user) {
    return res.status(404).json({ message: "The user with the specified ID does not exist." });
  }

  res.status(200).send(user);
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id == id);

  if(!user) {
    return res.status(404).json({ message: "The user with the specified ID does not exist." }); 
  }

  users = users.filter(user => user.id !== id);

  if (users.find(user => user.id == id)) {
    return res.status(500).json({ errorMessage: "The user could not be removed" });
  }

  res.status(200).send(user);
})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const newUserInfo = req.body;
  const user = users.find(user => user.id == id);

  if(!user) {
    return res.status(404).json({ message: "The user with the specified ID does not exist." });
  }

  if(!newUserInfo.bio || !newUserInfo.name) {
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  }

  user.name = newUserInfo.name;
  user.bio = newUserInfo.bio;

  if (user.name !== newUserInfo.name || user.bio !== newUserInfo.bio ) {
    return res.status(500).json({ errorMessage: "The user information could not be modified." });
  }

  res.status(200).send(user);
})


server.listen(5000, () => console.log("Up and Running on localhost:5000"));