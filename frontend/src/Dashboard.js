import React from "react";
import clock from "./images/clock.svg";
import cloud from "./images/cloud.svg";
import downloadCloud from "./images/download-cloud.svg";
import file from "./images/file.png";
import folder from "./images/folder.svg";
import image from "./images/image.svg";
import line2 from "./images/line-2.svg";
import logOut from "./images/log-out.svg";
import rectangle1 from "./images/rectangle-1.svg";
import search from "./images/search.svg";
import star from "./images/star.png";
import youtube from "./images/youtube.svg";
import "./style.css";

export const Dashboard = () => {
  return (
    <div className="dashoboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">My Docs</h1>
          <img className="line" alt="Separator line" src={line2} />
        </div>
        <nav className="sidebar-menu">
          <div className="menu-section">
            <h2 className="menu-title">Home</h2>
          </div>
          <div className="menu-section">
            <h2 className="menu-title">File Manager</h2>
            <ul className="menu-list">
                <a href="#MyStorage">
                    <li className="menu-item">
                        <img className="icon" alt="Cloud storage" src={cloud} />
                        My Storage
                    </li>
                </a>
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
        <img className="log-out" alt="Log out button" src={logOut} />
      </aside>
      <main className="main-content">
        <header className="main-header">
          <img className="search-bar" alt="Search bar" src={rectangle1} />
          <img className="search-icon" alt="Search icon" src={search} />
        </header>
        <section className="content-section">
          <div className="content-item">
            <img className="icon" alt="Gallery" src={image} />
            <p>Images</p>
          </div>
          <div className="content-item">
            <img className="icon" alt="Documents" src={file} />
            <p>Docs</p>
          </div>
          <div className="content-item">
            <img className="icon" alt="Video files" src={youtube} />
            <p>Video</p>
          </div>
          <div className="content-item">
            <img className="icon" alt="Downloadable files" src={downloadCloud} />
            <p>Download</p>
          </div>
        </section>
        <section className="preview-section">
          <h2>Preview</h2>
          <div className="preview-grid">
            <div className="preview-item"></div>
            <div className="preview-item"></div>
            <div className="preview-item"></div>
          </div>
        </section>
      </main>
    </div>
  );
};
