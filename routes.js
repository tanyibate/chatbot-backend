const responses = require("./responses");
var typeorm = require("typeorm");
const bcrypt = require("bcrypt");

const returnResponse = (req, res) => {
  const { message } = req.body;
  let response;
  response = responses.find((el) => {
    return el.question === message;
  });
  if (!response)
    response = {
      answer: "We currenly do not have an aswer to your query",
    };
  res.json({ answer: response.answer });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const connection = typeorm.getConnection();
  var users = connection.getRepository("User");
  const user = await users.findOne(id);
  res.json(user);
};

const register = async (req, res) => {
  const connection = typeorm.getConnection();
  var users = connection.getRepository("User");
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
};

module.exports = { returnResponse, getUser, register };
