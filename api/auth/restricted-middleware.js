module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    res.status(401).json({ message: 'you shall not pass' })
  }
};
