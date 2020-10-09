const router = require('express').Router();
const userController = require('../controllers/users');
const middleware = require('../middlewares');

// Register user --- /users/ - POST
router.post('/');

// Login user --- /users/login - POST
router.post('/login');

// Get user details --- /users/ - GET
router.get('/');

// User login listing --- /users/login - GET
router.get('/login');








module.exports = router;