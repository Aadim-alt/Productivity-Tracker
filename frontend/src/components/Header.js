import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content container">
        <Link to="/" className="logo">
          GitHub Productivity Tracker
        </Link>
        <div className="user-info">
          {user ? (
            <>
              <img src={user.avatarUrl} alt={user.username} className="user-avatar" />
              <span className="user-name">{user.displayName || user.username}</span>
              <button className="btn btn-secondary" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
