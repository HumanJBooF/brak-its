const db = require('../models/');

const userController = {

  createUser: (req, res) => {

    db.users.findOne({
      where: {
        username: req.body.username
      }
    }).then(dbUser => {

      if (!dbUser) {
        console.log('no user')
        db.users.create(req.body)
          .then(dbModel => {
            console.log(dbModel, 'THIS IS DB MODEL');
            res.json({ user: dbModel });
          }).catch(err => console.log(`createUser error: ${err}`));
      } else {
        res.json({ error: `Sorry ${req.body.username} is already taken` });
      }
    }).catch(err => res.json({ error: err }));
  },

  findUserForLogin: (username, password, _done) => {
    db.users.findOne({
      where: {
        username: username
      }
    }).then(dbUser => {
      if (!dbUser || !dbUser.validPassword(password)) {
        return _done(null, false, {
          message: "Incorrect Login Credentials"
        });
      }

      return _done(null, dbUser);
    }).catch(err => res.json({ error: err }))
  },

  findUsers: () => {

  }
}

module.exports = userController;