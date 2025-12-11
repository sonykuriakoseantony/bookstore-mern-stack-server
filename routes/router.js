const express = require('express');
const userController = require('../controllers/userController');

const router = new express.Router();

//register routes here
router.post('/register', userController.registerController);

//login routes here
router.post('/login', userController.loginController);

//google login routes here
router.post('/google-login', userController.googleLoginController);

module.exports = router

