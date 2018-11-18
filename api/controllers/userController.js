const db = require('../models/');

const userController = {

  create_user: (req, res) => {

    db.users.findOne({
      where: {
        username: req.body.username
      }
    }).then(dbUser => {

      if (!dbUser) {
        db.users.create(req.body)
          .then(dbModel => {
            res.json({ user: dbModel });
          }).catch(err => console.log(`createUser error: ${err}`));
      } else {
        res.json({ error: `Sorry ${req.body.username} is already taken` });
      }
    }).catch(err => res.json({ error: err }));
  },

  find_user_for_login: (username, password, _done) => {

    db.users.findOne({
      where: {
        username: username
      }
    }).then(dbUser => {
      if (!dbUser || !dbUser.validPassword(password)) {
        return _done(null, false, { message: "Incorrect Login Credentials" });
      }

      return _done(null, dbUser);
    }).catch(err => res.json({ error: err }))
  },

  check_user: (req, res) => {
    console.log(req.user);
    req.user
      ? res.json({
        username: req.user.username,
        loggedIn: true
      })
      : res.json({ err: null })
  },

  logout_user: (req, res) => {
    if (req.user) {
      req.logout()
      res.json({ message: `Success! You have been logged out.` })
    } else {
      res.json({ error: `No user was logged in` })
    }
  }
}

module.exports = userController;