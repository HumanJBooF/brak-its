// Dependencies
// =============================================================
const express = require("express");

require('dotenv').config();

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;
// const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// staticly serve the React build artifacts if NOT in development mode
if (process.env.NODE_ENV === "production") {
  console.log("Serving Static Build Content.");
  app.use(express.static("build"));
}

// Routes
// =============================================================

// Basic route
app.get("/api/test", (req, res) => {
  res.json({ status: "success" });
});

// commenting this out for now until the models are set up, just wanted to get sequelize ready to go
// db.sequelize.sync({force: false}).then(() => {

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log("API endpoint listening on PORT " + PORT);
});
// })