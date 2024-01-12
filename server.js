const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected successfully!");
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
});

const userSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    country: { type: String },
});

const User = mongoose.model('User', userSchema);

// Route to handle the creation of a new user
app.post('/users', async (req, res) => {
    try {
        const { email, password, country } = req.body;

        // Validate if required fields are present
        if (!email || !password || !country) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        // Create a new user instance
        const newUser = new User({
            email,
            password,
            country,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        console.error(error);
    }
});

app.get('/users' , async (req , res) => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}
)


