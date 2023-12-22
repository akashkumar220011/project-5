// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
// Add a route for handling authentication failure
router.get('/failure', (req, res) => {
    res.json({ success: false, message: 'Authentication failed.' });
  });
  router.get('/success', (req, res) => {
    res.json({ success: true, message: 'Auth successful.' });
  });
module.exports = router;
