const boom = require('@hapi/boom');

const authHandler = (req, res, next) => {
  const apiKey = req.headers['api'];

  if (apiKey === process.env.API_KEY) {
    return next();
  }
  next(boom.unauthorized('API key is required'));
}

const verifyRole = (req, res, next) => {
    const user = req.user;
    const role = user.role;
    console.log('user', user);
    console.log('role', role);
    if (!user) {
      return next(boom.unauthorized('Missing user'));
    }

    if (role === 'admin') {
      next();
    } else {
      next(boom.unauthorized('Insufficient permissions'));
    }
  }
module.exports = { authHandler, verifyRole };


