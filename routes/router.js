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

// home books
router.get('/home/books', bookController.getHomeBookController);

/**----------------------------Authorised Users only-------------------------**/

//add books 
router.post('/user/add/book', jwtMiddleware, multerMiddleware.array('uploadImg', 3), bookController.addBookController)

// all books except for logged in user
router.get('/all-books', jwtMiddleware, bookController.getUserAllBooksController);

// all user books
router.get('/user-books', jwtMiddleware, bookController.getUserProfileBooksController);

// all user bought books
router.get('/user-books/bought', jwtMiddleware, bookController.getUserBoughtBooksController);

module.exports = router

