const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    userType: {
        type: String,
        required: true,
        enum: ['student', 'tutor']
    },
    contactDetails: {
        phone: {
            type: String,
            trim: true
        },
        address: String
    },
    educationalBackground: {
        type: String,
        trim: true
    },
    areasOfExpertise: {
        type: [String],
        default: []
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]
        }
    },
    bio: String,
    profilePicture: String
});

// Create a geospatial index on the location field for efficient querying
userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);

module.exports = User;
