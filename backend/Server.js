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

// Register route (creates folders on both servers)
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

        // Define the network paths of both servers
        const serverPaths = [
          '\\\\172.19.21.103\\share',  // First server
          '\\\\172.19.21.109\\share'   // Second server
        ];

        let folderErrors = [];

        // Create folder on both servers
        serverPaths.forEach((serverPath) => {
          const folderPath = path.join(serverPath, username);
          try {
            if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath);
              console.log(`Folder created at: ${folderPath}`);
            } else {
              console.log('Folder already exists at: ${folderPath}');
            }
          } catch (folderError) {
            console.error(`Error creating folder at ${folderPath}:`, folderError);
            folderErrors.push(folderPath);
          }
        });

        if (folderErrors.length > 0) {
          return res.status(500).json({ message: `Some folders couldn't be created: ${folderErrors.join(', ')}` });
        }

        return res.json({ message: 'Registration successful! Folders created on both servers.' });
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
  db.query('SELECT * FROM users WHERE email = ?', [username], async (err, result) => { 
    if (err) throw err;
    if (result.length > 0) {
      const isMatch = await bcrypt.compare(password, result[0].password);
      if (isMatch) {
        const token = jwt.sign({ id: result[0].id }, 'secretkey', { expiresIn: '1h' }); 
        res.send({ message: 'Login successful', token });
      } else {
        res.send({ message: 'Invalid password' });
      }
    } else {
      res.send({ message: 'User not found' });
    }
  });
});

// Start the server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});