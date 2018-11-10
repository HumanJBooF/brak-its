// npm/file linking
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const controller = require('../../controllers/userController');

// Use a username/password login strategy
passport.use(new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password"
    }, (username, password, done) => {
        controller.findUserForLogin(username, password, done)
    }
));

// Used to add the user in the cookies for checking if user is logged in our not
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

module.exports = passport;