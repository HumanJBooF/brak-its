const db = require('../models/');

const userController = {

  createUser: (req, res) => {
    db.users.create(req.body)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      }).catch(err => console.log(`createUser error: ${err}`));
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
    });
  },
  findUsers: () => {

  }
}

module.exports = userController;