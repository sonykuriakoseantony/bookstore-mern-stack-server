const express = require('express');
const userController = require('../controllers/userController');

const router = new express.Router();

//register routes here
router.post('/register', userController.registerController);

module.exports = router
