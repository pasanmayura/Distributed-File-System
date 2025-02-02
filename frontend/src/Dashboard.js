import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import imageIcon from "./images/image.svg";
import fileIcon from "./images/file.png";
import youtubeIcon from "./images/youtube.svg";
import axios from "axios";
import "./style.css";

export const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      console.log("Token:", token);
    }
  }, []);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "image") {
      setSelectedImage(file); // Store actual file
    } else if (type === "document") {
      setSelectedDocument(file);
    } else if (type === "video") {
      setSelectedVideo(file);
    }
  };

  const triggerFileInput = (type) => {
    document.getElementById(`${type}-input`).click();
  };

  const handleRemove = (type) => {
    if (type === "image") setSelectedImage(null);
    if (type === "document") setSelectedDocument(null);
    if (type === "video") setSelectedVideo(null);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    if (selectedImage) formData.append("file", selectedImage);
    if (selectedDocument) formData.append("file", selectedDocument);
    if (selectedVideo) formData.append("file", selectedVideo);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Upload success:", response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error.response?.data || error);
      alert("File upload failed!");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        
        <section className="content-section">
          <div className="content-item" onClick={() => triggerFileInput("image")}>
            <img className="icon" alt="Gallery" src={imageIcon} />
            <p>Images</p>
          </div>
          <div className="content-item" onClick={() => triggerFileInput("document")}>
            <img className="icon" alt="Documents" src={fileIcon} />
            <p>Docs</p>
          </div>
          <div className="content-item" onClick={() => triggerFileInput("video")}>
            <img className="icon" alt="Video files" src={youtubeIcon} />
            <p>Video</p>
          </div>
        </section>

        <section className="preview-section">
          <h2>Preview</h2>
          <div className="preview-grid">
            {selectedImage && (
              <div className="preview-item">
                <p>{selectedImage.name}</p>
                <div className="preview-controls">
                  <button className="preview-control-btn" onClick={() => triggerFileInput("image")}>Edit</button>
                  <button className="preview-control-btn remove-btn" onClick={() => handleRemove("image")}>Remove</button>
                </div>
              </div>
            )}
            {selectedDocument && (
              <div className="preview-item">
                <p>{selectedDocument.name}</p>
                <div className="preview-controls">
                  <button className="preview-control-btn" onClick={() => triggerFileInput("document")}>Edit</button>
                  <button className="preview-control-btn remove-btn" onClick={() => handleRemove("document")}>Remove</button>
                </div>
              </div>
            )}
            {selectedVideo && (
              <div className="preview-item">
                <p>{selectedVideo.name}</p>
                <div className="preview-controls">
                  <button className="preview-control-btn" onClick={() => triggerFileInput("video")}>Edit</button>
                  <button className="preview-control-btn remove-btn" onClick={() => handleRemove("video")}>Remove</button>
                </div>
              </div>
            )}
          </div>
        </section>

        <center>
          <button className="upload-btn" onClick={handleUpload}>Upload</button>
        </center>
      </main>

      <input id="image-input" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileChange(e, "image")} />
      <input id="document-input" type="file" accept=".pdf,.doc,.docx,.txt" style={{ display: "none" }} onChange={(e) => handleFileChange(e, "document")} />
      <input id="video-input" type="file" accept="video/*" style={{ display: "none" }} onChange={(e) => handleFileChange(e, "video")} />
    </div>
  );
};
