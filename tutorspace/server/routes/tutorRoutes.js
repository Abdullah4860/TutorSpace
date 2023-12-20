const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const jwtHelper = require('../utils/jwtHelper')

// Create a new tutor profile
router.post('/create', tutorController.createTutorProfile);

// Get a tutor profile by ID
router.get('/:id', jwtHelper.verifyToken, tutorController.getTutorProfile);

// Update a tutor profile
router.patch('/:id', jwtHelper.verifyToken, tutorController.updateTutorProfile);

// Delete a tutor profile
router.delete('/:id', jwtHelper.verifyToken, tutorController.deleteTutorProfile);

module.exports = router;
