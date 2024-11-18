const express = require('express');
const passport = require('passport');

const AuthService = require('../services/auth.service');

const router = express.Router();
const service = new AuthService();

router.post('/login',
  //tenemos la capa de auntenticacion
  passport.authenticate('local', { session: false}),
  async (req, res, next) => {
    try {
      //obtenemos el user de la respuesta y creamos un payload con el id y el role
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);


router.post('/recovery',
  //la autenticacion local que tenemos devuelve el user en la respuesta si es satisfactoria
  async (req, res, next) => {
    try {
      //obtenemos el user de la respuesta y creamos un payload con el id y el role
      const { email } = req.user;
      const response = await service.sendRecoveryPassword(email);
      return response;
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
