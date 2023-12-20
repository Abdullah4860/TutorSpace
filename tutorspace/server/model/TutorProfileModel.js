const mongoose = require('mongoose');
const User = require('./Usermodel'); // Adjust the path as needed

const tutorProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    availability: String,
    experience: Number, // or String, depending on how you want to record experience
    subjectsOffered: [String],
    hourlyRate: Number,
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

const TutorProfile = mongoose.model('TutorProfile', tutorProfileSchema);

module.exports = TutorProfile;
