const service = require("../service");

const returnResponse = async (req, res) => {
  const { message } = req.body;
  try {
    let response;
    response = await service.getResponse(message);
    res.json({ answer: response.answer });
  } catch (err) {
    res.status(500);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = service.getUser(id);
    res.json(user);
  } catch (err) {
    res.status(500);
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = service.saveUser(email, password);
    res.json(user);
  } catch (err) {
    res.status(500);
  }
};

module.exports = { returnResponse, getUser, register };
