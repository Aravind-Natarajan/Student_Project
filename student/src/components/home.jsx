import React, { useState } from 'react';
import './home.css';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logo.webp';

function Home() {
  const [activeLink, setActiveLink] = useState('reg'); // Set default active link

  const handleLinkClick = (link) => {
    setActiveLink(link); // Change active link on click
  };

  return (
    <div className="container">
      <nav>
        <img src={logo} alt="Logo" />
        <h1>Welcome to My Project</h1>
      </nav>
      <div className="dashboard">
        <div className="menu">
          <Link
            to="reg"
            className={activeLink === 'reg' ? 'active' : ''}
            onClick={() => handleLinkClick('reg')}
          >
            Student Register
          </Link>
          <Link
            to="admin"
            className={activeLink === 'admin' ? 'active' : ''}
            onClick={() => handleLinkClick('admin')}
          >
            Admin
          </Link>
        </div>
        <div className="out">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
