import React from "react";
import { Link } from 'react-router-dom';
import clock from "./images/clock.svg";
import cloud from "./images/cloud.svg";
import file from "./images/file.png";
import folder from "./images/folder.svg";
import line2 from "./images/line-2.svg";
import logOut from "./images/log-out.svg";
import star from "./images/star.png";
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
        <div className="menu-section">
          <ul className="menu-list">
            <a href="#Home">
              <li className="menu-item">
                <img className="icon" alt="Home" src={cloud} />
                Home
              </li>
            </a>
          </ul>
        </div>
        <div className="menu-section">
          <h2 className="menu-title">File Manager</h2>
          <ul className="menu-list">
          <Link to="/storage">
            <li className="menu-item">
              <img className="icon" alt="Cloud storage" src={cloud} />
              My Storage
            </li>
          </Link>
            <a href="#Recent">
              <li className="menu-item">
                <img className="icon" alt="Recent files" src={star} />
                Recent
              </li>
            </a>
            <a href="#Favourite">
              <li className="menu-item">
                <img className="icon" alt="Favourite files" src={clock} />
                Favourite
              </li>
            </a>
          </ul>
        </div>
        <div className="menu-section">
          <h2 className="menu-title">Shared File</h2>
          <ul className="menu-list">
            <a href="#SharedFolder">
              <li className="menu-item">
                <img className="icon" alt="Shared folder" src={folder} />
                Shared Folder
              </li>
            </a>
            <a href="#SharedDocument">
              <li className="menu-item">
                <img className="icon" alt="Shared document" src={file} />
                Shared File
              </li>
            </a>
          </ul>
        </div>
      </nav>

      <img 
        className="log-out" 
        alt="Log out button" 
        src={logOut} 
        onClick={handleLogout} 
      />

    </aside>
  );
};