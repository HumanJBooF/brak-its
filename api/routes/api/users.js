const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require("../../config/passport/passport")

// Matches with "/api/users"
router.route("/create")
  .post(userController.createUser);

router.route("/login")
  .get((req, res) => {
    passport.authenticate(req.body)
  });


module.exports = router;
