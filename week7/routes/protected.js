const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/auth');

router.get('/dashboard', verifyJWT, (req, res) => {
    res.json({ message: `Welcome ${req.user.name}, you have accessed a protected route!` });
});

module.exports = router;
