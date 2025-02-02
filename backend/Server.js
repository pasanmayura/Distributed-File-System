const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer = require('multer');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'dfs',
  port: 3307
});

let mysqlConnected = false;
let mongoConnected = false;

// Attempt to connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    mysqlConnected = true;
    console.log('Connected to MySQL');
  }
});

mongoose.connect("mongodb+srv://kasun:123@cluster0.mvw9k.mongodb.net/DFS", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    mongoConnected = true;
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

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

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    let mysqlSuccess = false;
    let mongoSuccess = false;

    // Insert into MySQL
    db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)', 
      [username, hashedPassword],
      async (err, result) => {
        if (err) {
          console.error('MySQL error:', err);
        } else {
          mysqlSuccess = true;
        }

        // Insert into MongoDB
        const newUser = new User({
          email: username,
          password: hashedPassword,
          uploads: []
        });

        try {
          await newUser.save();
          mongoSuccess = true;
        } catch (mongoError) {
          console.error('MongoDB error:', mongoError);
        }

        if (mysqlSuccess || mongoSuccess) {
          return res.json({ message: 'Registration successful!' });
        } else {
          return res.status(500).json({ message: 'Registration failed in both databases.' });
        }
      }
    );
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'An error occurred during registration.' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = null;
    let mysqlUser = null;

    // Check MongoDB first
    if (mongoConnected) {
      try {
        user = await User.findOne({ email: username });
      } catch (mongoError) {
        console.error('MongoDB error:', mongoError);
      }
    }

    // If user is not found in MongoDB or MongoDB is not connected, check MySQL
    if (!user && mysqlConnected) {
      db.query('SELECT * FROM users WHERE email = ?', [username], async (err, results) => {
        if (err) {
          console.error('MySQL error:', err);
          return res.status(500).json({ message: 'Server error' });
        }

        if (results.length === 0) {
          return res.status(401).json({ message: 'User not found' });
        }

        mysqlUser = results[0];
        const isMatch = await bcrypt.compare(password, mysqlUser.password);

        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Register the user in MongoDB
        const newUser = new User({
          email: mysqlUser.email,
          password: mysqlUser.password,
          uploads: []
        });

        try {
          user = await newUser.save();
        } catch (mongoError) {
          console.error('MongoDB error:', mongoError);
          return res.status(500).json({ message: 'Error registering user in MongoDB', error: mongoError });
        }

        // Generate token
        const token = jwt.sign({ email: mysqlUser.email, id: mysqlUser.id }, 'your_jwt_secret', { expiresIn: '1h' });

        console.log("Generated Token:", token); // Debugging log

        return res.json({ token });
      });
    } else if (user) {
      // If user is found in MongoDB
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Register the user in MySQL if not already registered
      if (mysqlConnected) {
        db.query('SELECT * FROM users WHERE email = ?', [username], async (err, results) => {
          if (err) {
            console.error('MySQL error:', err);
            return res.status(500).json({ message: 'Server error' });
          }

          if (results.length === 0) {
            db.query('INSERT INTO users (email, password) VALUES (?, ?)', [user.email, user.password], (err, result) => {
              if (err) {
                console.error('MySQL error:', err);
                return res.status(500).json({ message: 'Error registering user in MySQL', error: err });
              }
            });
          }
        });
      }

      // Generate token
      const token = jwt.sign({ email: user.email, id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

      console.log("Generated Token:", token); // Debugging log

      return res.json({ token });
    } else {
      return res.status(500).json({ message: 'Server error: No database connection' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
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
  if (!mysqlConnected) {
    console.warn('Warning: Not connected to MySQL');
  }
  if (!mongoConnected) {
    console.warn('Warning: Not connected to MongoDB');
  }
});
