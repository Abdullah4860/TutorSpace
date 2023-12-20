const mongoose = require('mongoose');
const User = require('./Usermodel'); // Replace with the actual path

const studentProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subjectsSeeking: [String],
    learningObjectives: String
});

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

module.exports = StudentProfile;
