import React from 'react';
import { NavLink } from 'react-router-dom';

function Header({ handleLogout }) {
  return (
    <div className="header">
      <div>
        <NavLink to="/" exact>Dashboard</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/budget">Budget</NavLink>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Header;