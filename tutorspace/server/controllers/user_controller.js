const User = require('../model/Usermodel'); // Replace with the actual path
const bcryptHelper = require('../utils/bcryptHelper'); // Replace with actual path

// Modify the createUser method
const createUser = async (req, res) => {
    try {
        const hashedPassword = await bcryptHelper.hashPassword(req.body.password);
        const user = new User({ ...req.body, password: hashedPassword });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Modify the updateUser method
const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcryptHelper.hashPassword(req.body.password);
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isPasswordValid = await bcryptHelper.comparePassword(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwtHelper.generateToken(user);
        res.send({ user, token });
    } catch (error) {
        res.status(500).send(error);
    }
};


const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    login
};
