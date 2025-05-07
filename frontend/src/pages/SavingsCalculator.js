import React, { useState } from 'react';
import Card from '../components/Card';

const SavingsCalculator = ({ user }) => {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  const calculateSavings = () => {
    const monthlySavings = parseFloat(income) - parseFloat(expenses);
    const monthsNeeded = Math.ceil(parseFloat(savingsGoal) / monthlySavings);
    
    setResult({
      monthlySavings,
      monthsNeeded,
      achievable: monthlySavings > 0
    });
  };

  const saveSavingsGoal = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/expense/saving', { // Updated endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          amount: savingsGoal,
          description: `Savings goal: ${savingsGoal}`
        })
      });
      
      if (response.ok) {
        setMessage('Savings goal saved successfully!');
      } else {
        setMessage('Failed to save savings goal');
      }
    } catch (err) {
      setMessage('Failed to connect to server');
    }
  };

  return (
    <div className="page-container">
      <Card>
        <h2>Savings Calculator</h2>
        
        <div className="form-group">
          <label>Monthly Income (₹):</label>
          <input 
            type="number" 
            value={income} 
            onChange={(e) => setIncome(e.target.value)} 
            placeholder="Enter your monthly income" 
          />
        </div>

        <div className="form-group">
          <label>Monthly Expenses (₹):</label>
          <input 
            type="number" 
            value={expenses} 
            onChange={(e) => setExpenses(e.target.value)} 
            placeholder="Enter your monthly expenses" 
          />
        </div>

        <div className="form-group">
          <label>Savings Goal (₹):</label>
          <input 
            type="number" 
            value={savingsGoal} 
            onChange={(e) => setSavingsGoal(e.target.value)} 
            placeholder="Enter your savings goal" 
          />
        </div>

        <div className="button-group">
          <button type="button" onClick={calculateSavings} className="btn-primary">
            Calculate
          </button>
          <button type="button" onClick={saveSavingsGoal} className="btn-success">
            Save Goal
          </button>
        </div>

        {result && (
          <div className="results">
            <h3>Results:</h3>
            <p>Monthly Savings: ₹{result.monthlySavings.toFixed(2)}</p>
            {result.achievable ? (
              <>
                <p>Months needed to reach goal: {result.monthsNeeded}</p>
                <p className="message">You can achieve your savings goal!</p>
              </>
            ) : (
              <p className="error">You need to reduce expenses or increase income to reach this goal</p>
            )}
          </div>
        )}

        {message && <p className={message.includes('success') ? 'message' : 'error'}>{message}</p>}

        <div className="formula-card">
          <h4>Savings Calculation Formula</h4>
          <p>Monthly Savings = Monthly Income - Monthly Expenses</p>
          <p>Months Needed = Savings Goal / Monthly Savings</p>
        </div>
      </Card>
    </div>
  );
};

export default SavingsCalculator;