require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user_routes'); // Replace with the actual path to your user routes
const tutorRouter  = require('./routes/tutorRoutes'); // Replace with the actual path to your user routes
const studentRouter  = require('./routes/studentRoutes'); // Replace with the actual path to your user routes

const app = express();
const PORT = process.env.PORT || 3037;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


// Routes
app.use('/user', userRouter); // Prefix all user routes with /api
app.use('/tutors',tutorRouter ); // Prefix all user routes with /api
app.use('/students', studentRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
