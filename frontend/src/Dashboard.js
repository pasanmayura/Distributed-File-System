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
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedDocument(file.name);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = (type) => {
    if (type === "image") {
      document.getElementById("image-input").click();
    } else if (type === "document") {
      document.getElementById("document-input").click();
    } else if (type === "video") {
      document.getElementById("video-input").click();
    }
  };

  const handleRemove = (type) => {
    if (type === "image") {
      setSelectedImage(null);
    } else if (type === "document") {
      setSelectedDocument(null);
    } else if (type === "video") {
      setSelectedVideo(null);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
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
            {selectedImage && (
              <div className="preview-item">
                <img src={selectedImage} alt="Selected" />
                <div className="preview-controls">
                  <button className="preview-control-btn" onClick={() => triggerFileInput("image")}>Edit</button>
                  <button className="preview-control-btn remove-btn" onClick={() => handleRemove("image")}>Remove</button>
                </div>
              </div>
            )}
            {selectedDocument && (
              <div className="preview-item">
                <p>{selectedDocument}</p>
                <div className="preview-controls">
                  <button className="preview-control-btn" onClick={() => triggerFileInput("document")}>Edit</button>
                  <button className="preview-control-btn remove-btn" onClick={() => handleRemove("document")}>Remove</button>
                </div>
              </div>
            )}
            {selectedVideo && (
              <div className="preview-item">
                <video controls src={selectedVideo} />
                <div className="preview-controls">
                  <button className="preview-control-btn" onClick={() => triggerFileInput("video")}>Edit</button>
                  <button className="preview-control-btn remove-btn" onClick={() => handleRemove("video")}>Remove</button>
                </div>
              </div>
            )}
          </div>
        </section>
        <center>
          <button className="upload-btn">Upload</button>
        </center>
      </main>

      <input 
        id="image-input" 
        type="file" 
        accept="image/*" 
        style={{ display: "none" }} 
        onChange={handleImageUpload} 
      />

      <input 
        id="document-input" 
        type="file" 
        accept=".pdf,.doc,.docx,.txt" 
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