const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const signup = (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.run(sql, [name, email, password], function(err) {
    if (err) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(201).json({ 
      message: 'Signup successful!', 
      userId: this.lastID 
    });
  });
};
exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.run(sql, [name, email, password], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ 
      message: 'Signup successful!', 
      userId: this.lastID 
    });
  });
};
const login = (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.get(sql, [email, password], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ 
      message: 'Login successful!', 
      user: { id: user.id, name: user.name, email: user.email } 
    });
  });
};

module.exports = {
  signup,
  login
};