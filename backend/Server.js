const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://kasun:123@cluster0.mvw9k.mongodb.net/DFS");

// User schema and model
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  uploads: [{
    type: Object,  // Change from 'String' to 'Object'
    required: true,
    properties: {
      type: { type: String },
      data: { type: Buffer },
      filename: { type: String }
    }
  }]
});

const User = mongoose.model('User', userSchema);

// Multer setup for file uploads (store in memory)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (['image/png', 'image/jpg', 'image/jpeg', 'application/pdf', 'video/mp4'].includes(file.mimetype)) {
      callback(null, true);
    } else {
      console.log("Only jpg, png, pdf, and mp4 files are allowed!");
      callback(null, false);
    }
  }
});

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email: username, password: hashedPassword, uploads: [] });
  await user.save();
  res.json({ message: 'User registered successfully' });
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ email: username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email, id: user._id }, 'your_jwt_secret');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// File upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const userId = decoded.id;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create an object with the file metadata and data
    const fileMetadata = {
      type: req.file.mimetype, // MIME type (e.g., 'image/jpeg')
      data: req.file.buffer,    // File data as Buffer (binary content)
      filename: req.file.originalname // Original file name
    };

    // Push the file metadata into the user's uploads array
    user.uploads.push(fileMetadata);
    await user.save();
    
    res.json({ message: 'File uploaded successfully', file: fileMetadata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading file', error });
  }
});


// Start the server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
