const router = require('express').Router();
const userController = require('../controllers/users');
const middleware = require('../middlewares');

// Register user --- /users/ - POST
router.post('/', userController.registerUser);

// Login user --- /users/login - POST
router.post('/login', userController.loginUser);

// Get user details --- /users/ - GET
router.get('/', middleware.userAuth, userController.getUserDetails);

// User login listing --- /users/login - GET
router.get('/login');








module.exports = router;