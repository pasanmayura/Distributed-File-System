import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import searchIcon from "./images/search.svg";
import "./style.css";
import "./StyleCard.css";
import axios from 'axios';
import StorageCard from "./StorageCard";

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
          <h2>My Files</h2>
          <div className="file-grid">
            {filteredData.map((file, index) => (
              <StorageCard key={index} file={file} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Storage;