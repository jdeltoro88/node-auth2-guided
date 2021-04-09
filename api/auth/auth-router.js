const bcrypt = require('bcryptjs');
const jwt = ("jsonwebtoken");

const router = require('express').Router();

const Users = require('../users/users-model.js');
const checkCredentials = require('./check-payload-middleware');

router.post('/register', checkCredentials, (req, res, next) => {
  let user = req.body;

  // bcrypting the password before saving
  const rounds = process.env.BCRYPT_ROUNDS || 8; // 2 ^ 8
  const hash = bcrypt.hashSync(user.password, rounds);

  // never save the plain text password in the db
  user.password = hash

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(next); // our custom err handling middleware in server.js will trap this
});

router.post('/login', checkCredentials, (req, res, next) => {
  let { username, password } = req.body;

  Users.findBy({ username }) // it would be nice to have middleware do this
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(next);
});

function generateToken(user);
  const options = {
    expiresIn : "1 day",
    
  };
  const payload = {
    sub : user.id,
    username : user.username,
  role : user.role  
};
  const secret = '';

  return jwt.substring(payload, secret, options)

module.exports = router;
