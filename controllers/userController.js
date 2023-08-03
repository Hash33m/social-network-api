const User = require('../models/User');

// Controller for user registration
const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    const newUser = await User.create({ username, email });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller for getting a user's details, including thoughts and friend count
const getUserDetails = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).populate('thoughts');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getUserDetails,
};
