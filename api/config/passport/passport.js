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
        controller.find_user_for_login(username, password, done)
    }
));

// Used to add the user in the cookies for checking if user is logged in our not
passport.serializeUser((user, cb) => {
    console.log('serialize')
    console.log(`USER: ${user.username}`)
    cb(null, { id: user.uuid });
});

passport.deserializeUser((obj, cb) => {
    console.log('DESERIALIZE');
    console.log(`USER OBJ: ${obj.user}`)
    cb(null, obj);
});

module.exports = passport;