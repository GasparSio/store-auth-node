const boom = require('@hapi/boom');

const authHandler = (req, res, next) => {
  const apiKey = req.headers['api'];

  if (apiKey === process.env.API_KEY) {
    return next();
  }
  next(boom.unauthorized('API key is required'));
}
module.exports = { authHandler };


