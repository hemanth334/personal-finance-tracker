import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ExpenseCalculator from './pages/ExpenseCalculator';
import SavingsCalculator from './pages/SavingsCalculator';
import ExpenseHistory from './pages/ExpenseHistory';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      {user && <Navbar user={user} setUser={setUser} />}
      <div className="app-container">
        <Routes>
          <Route path="/" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/expense" element={user ? <ExpenseCalculator user={user} /> : <Navigate to="/login" />} />
          <Route path="/savings" element={user ? <SavingsCalculator user={user} /> : <Navigate to="/login" />} />
          <Route path="/history" element={user ? <ExpenseHistory user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;