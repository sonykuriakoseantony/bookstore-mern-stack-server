const express = require('express');
const userController = require('../controllers/userController');

const router = new express.Router();

//register routes here
router.post('/register', userController.registerController);

//login routes here
router.post('/login', userController.loginController);

module.exports = router

