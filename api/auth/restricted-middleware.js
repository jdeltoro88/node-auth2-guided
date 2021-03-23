const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/secrets')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    res.status(401).json({ message: 'you shall not pass' })
  } else {
    jwt.verify(token, jwtSecret, (err, de) => {

    })
  }
};
