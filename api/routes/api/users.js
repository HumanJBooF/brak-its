const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/users"
router.route("/create")
  .post(userController.createUser);


module.exports = router;
