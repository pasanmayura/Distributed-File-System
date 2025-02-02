import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import CloudIcon from "@mui/icons-material/Cloud";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import line2 from "./images/line-2.svg";
import "./style.css";

export const Sidebar = () => {
  const userEmail = sessionStorage.getItem("userEmail");

  const handleLogout = () => {
    sessionStorage.removeItem("userEmail");
    window.location.href = "/login";
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
          <a href="#Home">
            <li className="menu-item">
              <HomeIcon className="icon" />
              Home
            </li>
          </a>
          <a href="#MyStorage">
            <li className="menu-item">
              <CloudIcon className="icon" />
              My Storage
            </li>
          </a>
          <a href="#Recent">
            <li className="menu-item">
              <HistoryIcon className="icon" />
              Recent
            </li>
          </a>
          <a href="#Favourite">
            <li className="menu-item">
              <FavoriteIcon className="icon" />
              Favourite
            </li>
          </a>
        </ul>
      </nav>

      <div className="logout-container">
        <LogoutIcon className="log-out" onClick={handleLogout} />
      </div>
    </aside>
  );
};
