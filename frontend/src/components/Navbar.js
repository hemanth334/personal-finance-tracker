import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="welcome-message">Welcome, {user.name}!</div>
      <div className="nav-links">
        <button onClick={() => navigate('/')}>Dashboard</button>
        <button onClick={() => navigate('/expense')}>Expenses</button>
        <button onClick={() => navigate('/savings')}>Savings</button>
        <button onClick={() => navigate('/history')}>History</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;