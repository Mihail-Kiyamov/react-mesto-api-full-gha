const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

const { JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) next(new AuthError('Отсутствует токен'));

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    const authError = new AuthError(err.message);
    next(authError);
  }

  req.user = payload;

  next();
};
