// npm/file linking
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const controller = require('../../controllers/userController');
const db = require('../../models/');

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
passport.serializeUser((user, done) => {
    console.log('serialize')
    console.log(`USER: ${user.username}`)
    done(null, user);
});

passport.deserializeUser((id, done) => {
    db.users.findOne({
        where: {
            uuid: id.uuid
        }
    }).then(user => {
        console.log(`deserialized: ${user.username}`)
        if (!user) {
            done(new Error(`No user`));
        };
    });

    done(null, id);
});

module.exports = passport;