const StudentProfile = require('../model/studentProfileModel');
const User = require('../model/Usermodel');

// Create Student Profile
exports.createStudentProfile = async (req, res) => {
    try {
        let user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const studentProfile = new StudentProfile({
            user: user._id,
            subjectsSeeking: req.body.subjectsSeeking,
            learningObjectives: req.body.learningObjectives
        });

        await studentProfile.save();
        res.status(201).send(studentProfile);
    } catch (error) {
        res.status(400).send(error);
    }
};
// Get All Student Profiles
exports.getAllStudentProfiles = async (req, res) => {
    try {
        const studentProfiles = await StudentProfile.find().populate('user');
        res.send(studentProfiles);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get Student Profile by ID
exports.getStudentProfileById = async (req, res) => {
    try {
        const studentProfile = await StudentProfile.findById(req.params.id).populate('user');
        if (!studentProfile) {
            return res.status(404).send({ message: 'Student profile not found' });
        }
        res.send(studentProfile);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update Student Profile
exports.updateStudentProfile = async (req, res) => {
    try {
        const studentProfile = await StudentProfile.findByIdAndUpdate(
            req.params.id,
            {
                subjectsSeeking: req.body.subjectsSeeking,
                learningObjectives: req.body.learningObjectives
            },
            { new: true, runValidators: true }
        );

        if (!studentProfile) {
            return res.status(404).send({ message: 'Student profile not found' });
        }
        res.send(studentProfile);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete Student Profile
exports.deleteStudentProfile = async (req, res) => {
    try {
        const studentProfile = await StudentProfile.findByIdAndDelete(req.params.id);
        if (!studentProfile) {
            return res.status(404).send({ message: 'Student profile not found' });
        }
        res.send({ message: 'Student profile deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
