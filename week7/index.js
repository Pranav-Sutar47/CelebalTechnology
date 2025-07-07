const express = require('express');
const app = express();

app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
