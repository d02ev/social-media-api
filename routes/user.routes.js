const Router = require('express').Router();
const UserController = require('../controllers/user.controller');

Router.post('/authenticate', UserController.login);

module.exports = Router;