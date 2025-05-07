import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

const ExpenseHistory = ({ user }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/expense/history/${user.id}`
        );
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error('Failed to fetch history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user.id]);

  return (
    <div className="page-container">
      <Card>
        <h2>Expense History</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{new Date(t.date).toLocaleDateString()}</td>
                  <td className={t.type}>{t.type}</td>
                  <td>{t.category || '-'}</td>
                  <td>₹{parseFloat(t.amount).toFixed(2)}</td>
                  <td>{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default ExpenseHistory;