const express = require('express');
const userController = require('../controllers/userController');
const bookController = require('../controllers/bookController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const multerMiddleware = require('../middlewares/multerMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

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

//edit user profile
router.put('/user/:id/edit', jwtMiddleware, multerMiddleware.single('picture'), userController.editUserProfileController)

//get single book details
router.get('/books/:id/view', jwtMiddleware, bookController.viewSingleBookController)



/**----------------------------Admin Users only-------------------------**/

//get all books
router.get('/books/all', adminMiddleware, bookController.getAllBooksController)

//get all users
router.get('/users/all', adminMiddleware, userController.getAllUsersController);

//edit admin user profile
router.put('/admin/:id/edit', adminMiddleware, multerMiddleware.single('picture'), userController.editAdminUserProfileController)

module.exports = router

