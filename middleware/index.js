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

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
};
