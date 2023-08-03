const Thought = require('../models/Thought');

// Controller for creating a new thought
const createThought = async (req, res) => {
  try {
    const { thoughtText, username } = req.body;

    const newThought = await Thought.create({ thoughtText, username });

    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller for getting all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().exec();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createThought,
  getAllThoughts,
};
