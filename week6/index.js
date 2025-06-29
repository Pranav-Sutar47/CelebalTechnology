// Simple RESTful API with Node.js + Express for CRUD on "users"

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // to parse JSON request bodies

let users = []; // in-memory array to store users
let idCounter = 1; // for auto-incrementing user IDs

// Create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: idCounter++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Read all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Read a specific user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    res.json(user);
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
