const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const User = require('./models/user');
const URL = require('./models/url');
const authRoutes = require('./routes/authRoutes');
const urlRoute = require('./routes/url');
const { connectMongoose } = require('./config/mongoose');
const { config } = require('dotenv');
require('dotenv').config();

// Connect to MongoDB using Mongoose
connectMongoose();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session middleware
app.use(session({
  secret: process.env.SECRET, // Provide a secret key for session encryption
  resave: false,
  saveUninitialized: false,
}));

app.use(flash()); // Add this line for connect-flash

// Configure Passport middleware
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

// Set up flash messages middleware
app.use((req, res, next) => {
  res.locals.successFlash = req.flash('success');
  res.locals.errorFlash = req.flash('error');
  next();
});

// Passport configuration, User model, and other middleware...

// Set up routes
app.use('/auth', authRoutes);
app.use('/url', urlRoute);

// Redirect to the original URL based on the shortId
app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  
  // Update the URL visit history with the current timestamp
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  // Redirect to the original URL
  res.redirect(entry.redirectURL);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

