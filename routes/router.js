const express = require('express');
const userController = require('../controllers/userController');
const bookController = require('../controllers/bookController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const multerMiddleware = require('../middlewares/multerMiddleware');

const router = new express.Router();

//register routes here
router.post('/register', userController.registerController);

//login routes here
router.post('/login', userController.loginController);

//google login routes here
router.post('/google-login', userController.googleLoginController);

/**----------------------------Authorised Users only-------------------------**/
// home books
router.get('/home/books', bookController.getHomeBookController);

//add books 
router.post('/user/add/book', jwtMiddleware, multerMiddleware.array('uploadImg', 3), bookController.addBookController)

module.exports = router

