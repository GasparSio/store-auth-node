const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const userService = require('./user.service');
const service = new userService();
const { config } = require('../config/config');

class AuthService {
  constructor() {}

  async getUser(email, password) {
    const user = await service.findOneByEmail(email);
    if (!user) {
      throw boom.unauthorized('User not found');
    };

    const savedPassword = user.dataValues.password;
    const result = await bcrypt.compare(password, savedPassword);
    if (!result) {
      throw boom.unauthorized('User not found');
    };

    delete user.dataValues.password;
    return user;
  }

  signToken(user){
      const payload = {
        sub: user.id,
        role: user.role
      };
      //firmamos el token con el payload y el secret
      const token = jwt.sign(payload, config.jwtSecret);
      //devolvemos el user y el token en la respuesta
      return({
        user,
        token
      })
  }

  //metodo para enviar mail de recuperacion de contraseña
  async sendRecoveryPassword(email) {
    const user = await service.findOneByEmail(email);
    if (!user) {
      throw boom.unauthorized('User not found');
    };

    const payload = {
      sub: user.id,
    };

    //creamos nuevo token con el id del usuario y lo firmamos
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});

    //creamos el link con el token
    const link = `http://myfrontend.com/recovery?token=${token}`;

    //actualizamos campo recoveryToken en la base de datos
    await service.update(user.id, {recoveryToken: token});

    //configuracion del email
    const mail = {
      from: '"Gaspar Sio 👻" <sio.gaspar@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Email de recuperación de contraseña", // Subject line
      html: `<b>Ingresa a esta url para la recuperación de contraseña => ${link}</b>`, // html body
    }

    //enviamos el email
    const response = await this.sendMail(mail);
    return response;
  }

  async sendMail(emailInfo){
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: "sio.gaspar@gmail.com",
        pass: config.mailPass
      },
    });

    await transporter.sendMail({emailInfo});
  return {message: 'Email sent'};
  }
}

module.exports = AuthService;
