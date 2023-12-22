// controllers/authController.js

// Import necessary modules
const passport = require('passport');
const User = require('../models/user');

// Controller function for user registration
exports.register = (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Use Passport's User.register() method to create a new user
  User.register(new User({ username }), password, (err, user) => {
    if (err) {
      // Handle registration failure
      return res.json({ success: false, message: 'Registration failed.' });
    }

    // Authenticate the user using Passport after successful registration
    passport.authenticate('local')(req, res, () => {
      return res.json({ success: true, message: 'Registration successful.' });
    });
  });
};

// Controller function for user login
exports.login = (req, res, next) => {
  console.log("ashis", req.body);
  // Use Passport's authenticate method for local strategy
  passport.authenticate('local', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure', // Redirect to /auth/failure on authentication failure
    failureFlash: true,
  })(req, res, next);
};

// Controller function for user logout
exports.logout = (req, res) => {
  // Use Passport's logout method to log the user out
  req.logout((err)=>{
    if(err){
      console.log("error logout");
      return;
    }
    console.log("success logout");
  });
  res.json({ success: true, message: 'Logout successful.' });
};
