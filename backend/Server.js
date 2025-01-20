const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Make sure this is the correct password
  database: 'dfs',
  port: 3307 // Default MySQL port, or whatever is used in Workbench
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query(
    'INSERT INTO users (email, password) VALUES (?, ?)', // Using 'email' as column name
    [username, hashedPassword],
    (err, result) => {
      if (err) throw err;
      res.send({ message: 'User registered' });
    }
  );
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
