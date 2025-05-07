const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Add new expense
router.post('/expense', expenseController.addExpense);

// Add new saving
router.post('/saving', expenseController.addSaving);

// Get all financial records for a user
router.get('/history/:userId', expenseController.getHistory);

module.exports = router;