const shortid = require("shortid");
const URL = require("../models/url");

// Function to generate a new short URL
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  // Check if the 'url' property is present in the request body
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  // Generate a new short ID using the shortid library
  const shortID = shortid();

  // Create a new URL entry in the database
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  // Return the generated short ID in the response
  let shorturl = `http://localhost:8080/${shortID}`
  return res.json({ generated_url: shorturl });
}

// Function to get analytics for a short URL
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  // Find the URL entry in the database based on the short ID
  const result = await URL.findOne({ shortId });

  // Return analytics data in the response
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

// Export the functions for use in other files/routes
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
