const router = require("express").Router();
const controller = require("../controller");
const middleware = require("../middleware");
const passport = require("passport");

router.post(
  "/login",
  [middleware.checkNotAuthenticated, passport.authenticate("local")],
  (req, res) => {
    res.send("succesful signin");
  }
);

router.post("/register", middleware.checkNotAuthenticated, controller.register);

router.delete("/logout", (req, res) => {
  req.logOut();
});

router.post("/response", controller.returnResponse);

router.get("/users/:id", controller.getUser);

module.exports = router;
