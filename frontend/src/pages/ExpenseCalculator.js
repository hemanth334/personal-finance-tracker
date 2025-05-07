import React, { useState } from 'react';
import Card from '../components/Card';

const ExpenseCalculator = ({ user }) => {
  // Initialize all state variables properly
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState([{ category: '', amount: '' }]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [savings, setSavings] = useState(0);
  const [message, setMessage] = useState('');

  const calculateExpenses = () => {
    const total = expenses.reduce((sum, item) => {
      return sum + parseFloat(item.amount || 0);
    }, 0);
    
    setTotalExpense(total);
    
    if (income) {
      const calculatedSavings = parseFloat(income) - total;
      setSavings(calculatedSavings);
      setMessage(
        calculatedSavings >= 0
          ? `You can save ₹${calculatedSavings.toFixed(2)} this month!`
          : `You're overspending by ₹${Math.abs(calculatedSavings).toFixed(2)}!`
      );
    }
  };

  const saveExpenses = async () => {
    try {
      await Promise.all(
        expenses.map(expense => {
          if (expense.category && expense.amount) {
            return fetch('http://localhost:5000/api/expense/expense', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: user.id,
                amount: expense.amount,
                category: expense.category,
                description: `Expense for ${expense.category}`
              })
            });
          }
          return Promise.resolve();
        })
      );
      setMessage('Expenses saved successfully!');
    } catch (err) {
      setMessage('Failed to save expenses');
    }
  };

  const addExpenseField = () => {
    setExpenses([...expenses, { category: '', amount: '' }]);
  };

  const handleExpenseChange = (index, field, value) => {
    const newExpenses = [...expenses];
    newExpenses[index][field] = value;
    setExpenses(newExpenses);
  };

  return (
    <div className="page-container">
      <Card>
        <h2>Expense Calculator</h2>
        
        <div className="form-group">
          <label>Monthly Income (₹):</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter your monthly income"
          />
        </div>

        <h3>Expenses</h3>
        {expenses.map((expense, index) => (
          <div key={index} className="expense-row">
            <input
              type="text"
              value={expense.category}
              onChange={(e) => handleExpenseChange(index, 'category', e.target.value)}
              placeholder="Category (e.g., Food)"
            />
            <input
              type="number"
              value={expense.amount}
              onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)}
              placeholder="Amount (₹)"
            />
          </div>
        ))}
        
        <button type="button" onClick={addExpenseField} className="btn-secondary">
          Add Another Expense
        </button>

        <div className="button-group">
          <button type="button" onClick={calculateExpenses} className="btn-primary">
            Calculate
          </button>
          <button type="button" onClick={saveExpenses} className="btn-success">
            Save Expenses
          </button>
        </div>

        {totalExpense > 0 && (
          <div className="results">
            <p>Total Expenses: ₹{totalExpense.toFixed(2)}</p>
            {income && (
              <>
                <p>Monthly Income: ₹{parseFloat(income).toFixed(2)}</p>
                <p>Potential Savings: ₹{savings.toFixed(2)}</p>
              </>
            )}
            {message && <p className="message">{message}</p>}
          </div>
        )}

        <div className="formula-card">
          <h4>Expense Calculation Formula</h4>
          <p>Savings = Monthly Income - Total Expenses</p>
          <p>Total Expenses = Sum of all individual expenses</p>
        </div>
      </Card>
    </div>
  );
};

export default ExpenseCalculator;