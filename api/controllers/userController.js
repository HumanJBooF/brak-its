const db = require('../models/');

const userController = {

  createUser: (req, res) => {
    db.users.create(req.body)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      }).catch(err => console.log(`createUser error: ${err}`));
  },
  findUser: () => {

  },
  findUsers: () => {

  }
}

module.exports = userController;