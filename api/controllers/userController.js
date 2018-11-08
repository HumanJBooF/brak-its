const db = require("../models");

module.exports = {
  create: (req, res) => {
    console.log(typeof db.users)
    db.users
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};