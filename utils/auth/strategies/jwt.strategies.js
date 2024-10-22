const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

//pasamos por opciones, de donde sacara el token
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

//creamos la estrategia
//pasamos por parametros las opciones, esto respondera con el payload y una funcion done
const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});


module.exports = JwtStrategy;
