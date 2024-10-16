const express = require('express');

const { authHandler } = require('../middlewares/auth.handler');
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const orderRouter = require('./orders.router');
const customersRouter = require('./customers.router');
const authRouter = require('./auth.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);

  router.get('/', authHandler, (req, res) => {
    res.json({
      message: 'Bienvenido a la API v1',
      routes: {
        products: '/api/v1/products',
        categories: '/api/v1/categories',
        users: '/api/v1/users',
        orders: '/api/v1/orders',
        customers: '/api/v1/customers',
      },
    });
  });

  router.use('/auth', authRouter);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', authHandler, usersRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customersRouter);
}

module.exports = routerApi;
