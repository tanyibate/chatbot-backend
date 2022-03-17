if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/*
    if authentication isnt working remove checkAuthenticated middleware from /response route
*/

const express = require("express");
const app = express();
var typeorm = require("typeorm");
const passport = require("passport");
const session = require("express-session");
var cors = require("cors");
const router = require("./routes");

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // allow to server to accept request from different origin(set this to your own app url)
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
  app.use(router);

  app.listen(process.env.PORT || 4000);
});
