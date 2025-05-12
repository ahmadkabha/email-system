const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({ message: 'No token, access denied' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authenticate;
