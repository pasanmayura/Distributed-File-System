import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import searchIcon from "./images/search.svg";
import "./style.css";
import axios from 'axios';

const Storage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem('token'); // Get JWT token from local storage
        const response = await axios.get('http://localhost:3001/api/files', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFiles(response.data.files); // Store files in state
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const filteredData = files.filter((item) =>
    (selectedCategory === "all" || item.type.includes(selectedCategory)) &&
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <header className="main-header">
          <input
            type="text"
            className="search-bar"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img className="search-icon" src={searchIcon} alt="Search" />
        </header>

        <div className="filter-buttons">
          {["all", "image", "video", "document"].map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <section className="preview-section">
          <h2>File Preview</h2>
          <div className="preview-grid">
            {filteredData.map((item, index) => (
              <div key={index} className="preview-item">
                {item.type.startsWith("image/") && (
                  <img src={`data:${item.type};base64,${btoa(String.fromCharCode(...new Uint8Array(item.data.data)))}`} alt={item.filename} />
                )}
                {item.type.startsWith("video/") && (
                  <video controls>
                    <source src={`data:${item.type};base64,${btoa(String.fromCharCode(...new Uint8Array(item.data.data)))}`} type={item.type} />
                  </video>
                )}
                {item.type === "application/pdf" && (
                  <a href={`data:application/pdf;base64,${btoa(String.fromCharCode(...new Uint8Array(item.data.data)))}`} target="_blank" rel="noopener noreferrer">
                    📄 {item.filename}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Storage;