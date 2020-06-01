const express = require('express');
const shortid = require('shortid');
const cors = require('cors');

const PORT =  5000;

const server = express();

server.use(express.json());
server.use(cors());

let users = [];

server.get('/api/users', (req, res) => {
  if(!users) {
    return res.status(500).json({ errorMessage: "The users information could not be retrieved." });
  }

  res.status(200).json(users);
})

server.get(`/api/users/:id`, (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id == id);

  if (!user) {
    return res.status(404).json({ message: "The user with the specified ID does not exist." });
  }

  if(!id) {
    return res.status(500).json({ errorMessage: "The user information could not be retrieved." })
  }

  res.status(200).json(user);
})

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;

  if(!name || !bio ) {
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  }

  const id = shortid.generate();

  users.push({ id, name, bio });

  const newUser = users.find(user => user.name === name && user.bio === bio && user.id === id);

  if (!newUser) {
    return res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
  }

  res.status(201).json(newUser);
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  const userToDelete = users.find(user => user.id == id);

  if(!userToDelete) {
    return res.status(404).json({ message: "The user with the specified ID does not exist." });
  }

  users = users.filter(user => user.id != id);

  if (users.find(user => user.id == id)) {
    return res.status(500).json({ errorMessage: "The user could not be removed" });
  }

  res.status(200).json(userToDelete);
})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body; 
  const user = users.find(user => user.id == id);

  if (!user) {
    return res.status(404).json({ message: "The user with the specified ID does not exist." });
  }

  if (!name || !bio) {
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  }

  user.name = name;
  user.bio = bio;

  const updatedUser = users.find(user => user.name === name && user.bio === bio && user.id === id);

  if (!updatedUser) {
    return res.status(500).json({ errorMessage: "The user information could not be modified." });
  }

  res.status(200).json(updatedUser);
})

server.listen(PORT, () => {
  console.log(`\n Listening on localhost:${PORT} \n`);
})