const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Create user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: { name, email },
  });
  res.json(user);
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(user);
});

// Update user
app.put('/users/:id', async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: { id: parseInt(req.params.id) },
    data: { name, email },
  });
  res.json(user);
});

// Delete user
app.delete('/users/:id', async (req, res) => {
  await prisma.user.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json({ message: 'User deleted' });
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
