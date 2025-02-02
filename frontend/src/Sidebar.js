import React from "react";
import { Link } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";
import CloudIcon from "@mui/icons-material/Cloud";
import LogoutIcon from "@mui/icons-material/Logout";
import line2 from "./images/line-2.svg";
import "./style.css";

export const Sidebar = () => {

  const userEmail = sessionStorage.getItem("userEmail");

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("userEmail");
    
    // Redirect to login page
    window.location.href = "/login";  // Or use history.push('/login') if you're using React Router
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">DocuCloud</h1>
        <h4>{userEmail ? userEmail : "User"}</h4>
        <img className="line" alt="Separator line" src={line2} />
      </div>

      <nav className="sidebar-menu">
        <ul className="menu-list">
          <Link to="/dashboard">
              <li className="menu-item">
                <HomeIcon className="icon" />
                Home
              </li>
          </Link>
          <Link to="/storage">
            <li className="menu-item">
              <CloudIcon className="icon" />
              My Storage
            </li>
          </Link>
        </ul>
      </nav>

      <div className="logout-container">
        <LogoutIcon className="log-out" onClick={handleLogout} />
      </div>
    </aside>
  );
};