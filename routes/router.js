const express = require('express');
const userController = require('../controllers/userController');
const bookController = require('../controllers/bookController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

const router = new express.Router();

//register routes here
router.post('/register', userController.registerController);

//login routes here
router.post('/login', userController.loginController);

//google login routes here
router.post('/google-login', userController.googleLoginController);

/**----------------------------Authorised Users only-------------------------**/
//add books 
router.post('/user/add/book', jwtMiddleware, bookController.addBookController)

module.exports = router

