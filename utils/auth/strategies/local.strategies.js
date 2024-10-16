const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UserService = require('../../../services/user.service');

const service = new UserService();

const localStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.findOneByEmail(email);

      if (!user) {
        done(boom.unauthorized('User not found'), false);
      };

      const savedPassword = user.dataValues.password;
      const result = await bcrypt.compare(password, savedPassword);
      if (!result) {
        done(boom.unauthorized('Invalid password'), false);
      };

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = localStrategy;
