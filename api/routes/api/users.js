const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require("../../config/passport/passport")

// Matches with "/api/users"
router.route("/create")
  .post(userController.createUser);

router.route("/login")
  .post(passport.authenticate("local"), (req, res) => {
    console.log("here", req.user.username)
  });


module.exports = router;
