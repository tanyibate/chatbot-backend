if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/*
    if authentication isnt working remove checkAuthenticated middleware from /response route
*/

const express = require("express");
const app = express();
var typeorm = require("typeorm");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
var cors = require("cors");

const methods = require("./routes");
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin(set this to your own app url)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

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

  app.post("/register", checkNotAuthenticated, methods.register);

  app.delete("/logout", (req, res) => {
    req.logOut();
  });

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).send("unauthorized");
  }

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      res.send("session is already in place");
    }
    next();
  }

  app.post("/response", checkAuthenticated, methods.returnResponse);

  app.get("/users/:id", methods.getUser);

  app.listen(4000);
});
