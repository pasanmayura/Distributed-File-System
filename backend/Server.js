const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

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

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)', 
      [username, hashedPassword],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Database error occurred.' });
        }

        const folderPath = path.join('\\\\192.168.1.5\\Share', username);

        // Check if the folder exists, create if not
        if (!fs.existsSync(folderPath)) {
          try {
            fs.mkdirSync(folderPath);
            return res.json({ message: 'Registration successful! Folder created.' });
          } catch (folderError) {
            console.error(folderError);
            return res.status(500).json({ message: 'Failed to create folder.' });
          }
        } else {
          return res.json({ message: 'Registration successful! Folder already exists.' });
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred during registration.' });
  }
});


// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [username], async (err, result) => { // Querying by 'email' to match registration
    if (err) throw err;
    if (result.length > 0) {
      const isMatch = await bcrypt.compare(password, result[0].password);
      if (isMatch) {
        const token = jwt.sign({ id: result[0].id }, 'secretkey', { expiresIn: '1h' }); // Set token expiration to 1 hour
        res.send({ message: 'Login successful', token });
      } else {
        res.send({ message: 'Invalid password' });
      }
    } else {
      res.send({ message: 'User not found' });
    }
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
