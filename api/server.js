// Dependencies
// =============================================================
const express = require("express");

require('dotenv').config();

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./models');

const routes = require("./routes");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Passport
// app.use(session({ secret: 'BrakitsSecret', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// staticly serve the React build artifacts if NOT in development mode
if (process.env.NODE_ENV === "production") {
  console.log("Serving Static Build Content.");
  app.use(express.static("build"));
}

// Routes
// =============================================================

// Basic route
app.use(routes);



db.sequelize.sync({ force: true }).then(() => {

  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, () => {
    console.log(`Here: ${routes}`)
    console.log("API endpoint listening on PORT " + PORT);
  });
})