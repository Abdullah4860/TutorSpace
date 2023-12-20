const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller'); // Replace with the actual path
const jwtHelper = require('../utils/jwtHelper'); // Replace with actual path

// Login route
router.post('/login', userController.login);

// Apply JWT verification to protected routes
router.get('/', jwtHelper.verifyToken, userController.getAllUsers);
router.post('/create', userController.createUser);
router.get('/:id', jwtHelper.verifyToken, userController.getUserById);
router.patch('/:id', jwtHelper.verifyToken, userController.updateUser);
router.delete('/:id', jwtHelper.verifyToken, userController.deleteUser);

module.exports = router;
