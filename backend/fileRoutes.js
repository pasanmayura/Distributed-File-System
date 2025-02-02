const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// User Schema (Copy this from server.js)
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  uploads: [{
    type: Object,
    required: true,
    properties: {
      type: { type: String },
      data: { type: Buffer },
      filename: { type: String }
    }
  }]
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
 // Create User Model

const router = express.Router();

// API to Fetch Uploaded Files
router.get('/files', async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Get token from header
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Verify token
    const userId = decoded.id;

    const user = await User.findById(userId); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ files: user.uploads }); // Send user's uploaded files
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching files', error });
  }
});

module.exports = router;