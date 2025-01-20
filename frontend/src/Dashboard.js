import React, { useState } from "react";
import { Sidebar } from "./Sidebar"; // Import the Sidebar component
import rectangle1 from "./images/rectangle-1.svg";
import search from "./images/search.svg";
import image from "./images/image.svg";
import file from "./images/file.png";
import youtube from "./images/youtube.svg";
import "./style.css";

export const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null); // State to store selected document
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Create a local URL for preview
    }
  };

  // Handle document upload
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedDocument(file.name); // Just displaying the document name
    }
  };

  // Handle video upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(URL.createObjectURL(file)); // Create a local URL for video preview
    }
  };

  // Trigger the file input click
  const triggerFileInput = (type) => {
    if (type === "image") {
      document.getElementById("image-input").click();
    } else if (type === "document") {
      document.getElementById("document-input").click();
    } else if (type === "video") {
      document.getElementById("video-input").click();
    }
  };

  return (
    <div className="dashboard">
      <Sidebar /> {/* Use the Sidebar component here */}
      <main className="main-content">
        <header className="main-header">
          <img className="search-bar" alt="Search bar" src={rectangle1} />
          <img className="search-icon" alt="Search icon" src={search} />
        </header>
        <section className="content-section">
          <div className="content-item" onClick={() => triggerFileInput("image")}>
            <img className="icon" alt="Gallery" src={image} />
            <p>Images</p>
          </div>
          <div className="content-item" onClick={() => triggerFileInput("document")}>
            <img className="icon" alt="Documents" src={file} />
            <p>Docs</p>
          </div>
          <div className="content-item" onClick={() => triggerFileInput("video")}>
            <img className="icon" alt="Video files" src={youtube} />
            <p>Video</p>
          </div>
        </section>
        <section className="preview-section">
          <h2>Preview</h2>
          <div className="preview-grid">
            {/* <div className="preview-item">
              {selectedImage && <img src={selectedImage} alt="Selected" className="preview-image" />}
            </div> */}
            <div className="preview-item"></div>
            <div className="preview-item"></div>
            <div className="preview-item"></div>
          </div>
        </section>
      </main>

      <input 
        id="file-input" 
        type="file" 
        accept="image/*" 
        style={{ display: "none" }} 
        onChange={handleImageUpload} 
      />

      <input 
        id="document-input" 
        type="file" 
        accept=".pdf,.doc,.docx,.txt" // You can specify document formats
        style={{ display: "none" }} 
        onChange={handleDocumentUpload} 
      />

      <input 
        id="video-input" 
        type="file" 
        accept="video/*" 
        style={{ display: "none" }} 
        onChange={handleVideoUpload} 
      />

    </div>
  );
};
