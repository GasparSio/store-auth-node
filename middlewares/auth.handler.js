const boom = require('@hapi/boom');

const authHandler = (req, res, next) => {
  const apiKey = req.headers['api'];

  if (apiKey === process.env.API_KEY) {
    return next();
  }
  next(boom.unauthorized('API key is required'));
}

//en la funcion principal se recibe un array de roles
//y retornara un middleware que verificara el rol del usuario
const verifyRole = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    //si el rol del usuario que viene en el req.user esta incluido en el array de roles que se le pasa
    //al middleware entonces se llama a next() para que continue con el flujo
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized('Insufficient permissions'));
    }
  }
}
module.exports = { authHandler, verifyRole };


