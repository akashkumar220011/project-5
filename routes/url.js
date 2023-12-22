const express = require("express");

const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    console.log("not authenticated");
    // res.redirect("/auth/login");
     // Redirect to the login page if not authenticated
     return res.status(401).json({error: "not authorized"});
  };
  

// Protected routes, only accessible by authenticated users
router.post("/", checkAuthentication, handleGenerateNewShortURL);
router.get("/analytics/:shortId", checkAuthentication, handleGetAnalytics);


module.exports = router;
