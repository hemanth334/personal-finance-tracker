import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <Card>
        <h2>Welcome, {user.name}!</h2>
        <p>Manage your personal finances efficiently</p>
        
        <div className="dashboard-cards">
          <div className="dashboard-card" onClick={() => navigate('/expense')}>
            <h3>Expense Calculator</h3>
            <p>Track and calculate your expenses</p>
          </div>
          
          <div className="dashboard-card" onClick={() => navigate('/savings')}>
            <h3>Savings Calculator</h3>
            <p>Plan your savings goals</p>
          </div>
          
          <div className="dashboard-card" onClick={() => navigate('/history')}>
            <h3>Expense History</h3>
            <p>View your transaction history</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;