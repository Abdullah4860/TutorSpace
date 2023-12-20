const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController'); // Adjust the path as needed
const jwtHelper = require('../utils/jwtHelper'); // If you're using JWT for authentication

// Create a new student profile
router.post('/create', studentController.createStudentProfile);

// Get all student profiles
router.get('/', jwtHelper.verifyToken, studentController.getAllStudentProfiles);

// Get a single student profile by ID
router.get('/:id', jwtHelper.verifyToken, studentController.getStudentProfileById);

// Update a student profile
router.patch('/:id', jwtHelper.verifyToken, studentController.updateStudentProfile);

// Delete a student profile
router.delete('/:id', jwtHelper.verifyToken, studentController.deleteStudentProfile);

module.exports = router;
