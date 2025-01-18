import React from "react";
import { Sidebar } from "./Sidebar"; // Import the Sidebar component
import rectangle1 from "./images/rectangle-1.svg";
import search from "./images/search.svg";
import image from "./images/image.svg";
import file from "./images/file.png";
import youtube from "./images/youtube.svg";
import downloadCloud from "./images/download-cloud.svg";
import "./style.css";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar /> {/* Use the Sidebar component here */}
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
