const db = require('../db');  // Use the proper db connection

exports.addExpense = (req, res) => {
  const { userId, amount, category, description } = req.body;
  
  db.run(
    `INSERT INTO finances (user_id, type, amount, category, description) 
     VALUES (?, 'expense', ?, ?, ?)`,
    [userId, amount, category, description],
    function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to add expense' });
      }
      res.json({ 
        message: 'Expense added successfully',
        id: this.lastID 
      });
    }
  );
};

exports.addSaving = (req, res) => {
  const { userId, amount, description } = req.body;
  
  db.run(
    `INSERT INTO finances (user_id, type, amount, description) 
     VALUES (?, 'saving', ?, ?)`,
    [userId, amount, description],
    function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to add saving' });
      }
      res.json({ 
        message: 'Saving added successfully',
        id: this.lastID 
      });
    }
  );
};

exports.getHistory = (req, res) => {
  const { userId } = req.params;
  
  db.all(
    `SELECT * FROM finances 
     WHERE user_id = ? 
     ORDER BY date DESC`,
    [userId],
    (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to fetch history' });
      }
      res.json(rows);
    }
  );
};