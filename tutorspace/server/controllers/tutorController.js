const TutorProfile = require('../model/TutorProfileModel');
const User = require('../model/Usermodel');
const bcryptHelper = require('../utils/bcryptHelper'); // Replace with actual path
const jwtHelper = require('../utils/jwtHelper')

// Create a new tutor profile
exports.createTutorProfile = async (req, res) => {
    try {
        // Check if the user already exists
        let user = await User.findOne({ _id: req.body.user });
        console.log(user);
        if (!user) {
            // Create a new user if not exists
            user = new User({
                username: req.body.username,
                password: await bcryptHelper.hashPassword(req.body.password),
                email: req.body.email,
                userType: 'tutor', // Assuming userType is part of the user model
                // ... add other User fields if needed ...
            });
            await user.save();
        }

        // Create a Tutor Profile
        const tutorProfileData = {
            user: user._id,
            availability: req.body.availability,
            experience: req.body.experience,
            subjectsOffered: req.body.subjectsOffered,
            hourlyRate: req.body.hourlyRate,
            // Do not include ratings and reviews in creation, they will be added later
        };

        const tutorProfile = new TutorProfile(tutorProfileData);
        await tutorProfile.save();

        res.status(201).send(tutorProfile);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};

// Get a tutor profile by ID
exports.getTutorProfile = async (req, res) => {
    try {
        const tutorProfile = await TutorProfile.findById(req.params.id).populate('user');
        if (!tutorProfile) {
            return res.status(404).send();
        }
        res.send(tutorProfile);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a tutor profile
exports.updateTutorProfile = async (req, res) => {
    try {
        const tutorProfile = await TutorProfile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!tutorProfile) {
            return res.status(404).send();
        }
        res.send(tutorProfile);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a tutor profile
exports.deleteTutorProfile = async (req, res) => {
    try {
        const tutorProfile = await TutorProfile.findByIdAndDelete(req.params.id);
        if (!tutorProfile) {
            return res.status(404).send();
        }
        res.send(tutorProfile);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Additional methods can be added as per your application's requirements.
