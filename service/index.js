const responses = require("../responses");
var typeorm = require("typeorm");
const bcrypt = require("bcrypt");

const getResponse = async (message) => {
  let response;
  response = responses.find((el) => {
    return el.question === message;
  });
  if (!response)
    response = {
      answer: "We currenly do not have an aswer to your query",
    };
  return response;
};

const getUser = async (id) => {
  const connection = typeorm.getConnection();
  var users = connection.getRepository("User");
  const user = await users.findOne(id);
  return user;
};

const saveUser = async (email, password) => {
  const connection = typeorm.getConnection();
  var users = connection.getRepository("User");
  const hashedPassword = await bcrypt.hash(password, 10); // hashing password for security so if db gets comprimised passwords cannot get retrieved
  let user = { email: email, password: hashedPassword };
  user = users.save(user).then(function (savedUser) {
    return savedUser;
  });
  return user;
};
module.exports = { getUser, saveUser, getResponse };
