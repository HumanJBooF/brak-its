// Dependencies
// =============================================================
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport/passport');

require('dotenv').config();

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./models');

const routes = require('./routes');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: 'BrakitsSecret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } //remember user for 30 days
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// staticly serve the React build artifacts if NOT in development mode
if (process.env.NODE_ENV === 'production') {
  console.log('Serving Static Build Content.');
  app.use(express.static('build'));
}

// Basic route
app.use(routes);



db.sequelize.sync({ force: true }).then(() => {
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, () => {
    console.log(`Here: ${routes}`)
    console.log(`API endpoint listening on PORT ${PORT}`);
  });
})