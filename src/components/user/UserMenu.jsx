// src/components/UserMenu.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Heart, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './UserMenu.css';

function UserMenu() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="user-menu">
        <button className="login-btn" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="register-btn" onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
    );
  }

  return (
    <div className="user-menu">
      <button className="user-avatar" onClick={() => setIsOpen(!isOpen)}>
        <User size={20} />
        <span>{user?.name}</span>
      </button>

      {isOpen && (
        <>
          <div className="menu-overlay" onClick={() => setIsOpen(false)} />
          <div className="user-dropdown">
            <div className="dropdown-header">
              <div className="user-info">
                <div className="user-avatar-large">
                  <User size={24} />
                </div>
                <div className="user-details">
                  <h3>{user?.name}</h3>
                  <p>{user?.email}</p>
                </div>
              </div>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="dropdown-menu">
              <button
                className="menu-item"
                onClick={() => {
                  navigate('/favorites');
                  setIsOpen(false);
                }}
              >
                <Heart size={18} />
                <span>My Favorites</span>
              </button>

              <button className="menu-item logout" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserMenu;