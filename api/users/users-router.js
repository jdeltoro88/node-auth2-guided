const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

const only = role => (req, res, next) => {
  // fish the token from req
  // fish the actual role from the token
  // compare that against the role coming in through args
}

router.get("/", restricted, only('admin'), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
