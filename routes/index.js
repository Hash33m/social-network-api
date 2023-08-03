const express = require('express');
const router = express.Router();
const User = require('./models/User');
const Thought = require('./models/thought');

// Endpoint for user registration
router.post('/users', async (req, res) => {
  try {
    const { username, email } = req.body;

   

    // Create a new user using the User model
    const newUser = await User.create({ username, email });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint for thought creation
router.post('/thoughts', async (req, res) => {
  try {
    const { thoughtText, username } = req.body;

    // Create a new thought using the Thought model
    const newThought = await Thought.create({ thoughtText, username });

    // Add the thought's ID to the user's thoughts array
    const user = await User.findOneAndUpdate(
      { username },
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint to get all thoughts
router.get('/thoughts', async (req, res) => {
  try {
    // Fetch all thoughts using the Thought model
    const thoughts = await Thought.find().exec();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to get a user's thoughts and friend count
router.get('/users/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user using the User model
    const user = await User.findOne({ username }).populate('thoughts');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
