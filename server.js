if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
var typeorm = require("typeorm");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");

typeorm.createConnection().then(async (connection) => {
  const initializePassport = require("./passport-config");
  var users = connection.getRepository("User");

  initializePassport(
    passport,
    async (email) => await users.findOne({ email: email }),
    async (id) => await users.findOne(id)
  );

  app.use(express.json());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.post(
    "/login",
    [checkNotAuthenticated, passport.authenticate("local")],
    (req, res) => {
      res.send("succesful signin");
    }
  );

  app.post("/register", checkNotAuthenticated, async (req, res) => {
    const { email, password } = req.body;
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10); // hashing password for security so if db gets comprimised passwords cannot get retrieved
    let user = { email: email, password: hashedPassword };
    users
      .save(user)
      .then(function (savedUser) {
        console.log("User has been saved: ", savedUser);
        console.log("Now lets load all users: ");
        res.json(savedUser);
        return users.find();
      })
      .then(function (allUsers) {
        console.log("All users: ", allUsers);
      })
      .catch((err) => {
        console.log(err);
        res.status(422).send("could not add user to database");
      });
  });

  app.delete("/logout", (req, res) => {
    req.logOut();
  });

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).send("anauthorized");
  }

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      res.send("session is already in place");
    }
    next();
  }

  app.get("/", async (req, res) => {
    const user = await users.findOne(1);
    res.json(user);
  });

  app.listen(4000);
});
