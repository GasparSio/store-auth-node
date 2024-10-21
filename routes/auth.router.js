const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config');
const router = express.Router();

router.post('/login',
  //tenemos la capa de auntenticacion
  passport.authenticate('local', { session: false}),
  //la autenticacion local que tenemos devuelve el user en la respuesta si es satisfactoria
  async (req, res, next) => {
    try {
      //obtenemos el user de la respuesta y creamos un payload con el id y el role
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role
      };
      //firmamos el token con el payload y el secret
      const token = jwt.sign(payload, config.jwtSecret);
      //devolvemos el user y el token en la respuesta
      res.json({
        user,
        token
      })
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
