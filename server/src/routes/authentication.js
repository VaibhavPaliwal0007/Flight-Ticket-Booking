const express = require('express');

const authenticationRoute = new express.Router();

const { validateSession, validateAdminSession } = require('../middleware/auth');

const { signup, login, logout } = require('../controllers');

authenticationRoute.post('/signup', signup);
authenticationRoute.post('/login', login);
authenticationRoute.post('/logout', validateSession, logout);
authenticationRoute.post('/login/admin', validateAdminSession, login);

module.exports = authenticationRoute;
