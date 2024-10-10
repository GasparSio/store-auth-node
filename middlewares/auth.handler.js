const boom = require('@hapi/boom');

const authHandler = (req, res, next) => {
  const apiKey = req.headers['api'];

  if (apiKey === '123') {
    next();
  }
  next(boom.unauthorized('API key is required'));
}
module.exports = { authHandler };


