const express = require('express');

const authenticationRoute = new express.Router();

const { validateSession } = require('../middleware/auth');

const { signup, login, logout, loginAdmin , loginByToken } = require('../controllers');

authenticationRoute.post('/signup', signup);
authenticationRoute.post('/login', login);
authenticationRoute.post('/logout', validateSession, logout);
authenticationRoute.post('/login/admin', loginAdmin);
authenticationRoute.post('/loginByToken' , validateSession , loginByToken);

module.exports = authenticationRoute;
