import React, { useState } from "react";
import { Sidebar } from "./Sidebar"; // Sidebar Component
import searchIcon from "./images/search.svg";
import "./style.css";

const Storage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Dummy Data for Display (Replace with database fetch)
  const data = [
    { type: "image", src: "https://via.placeholder.com/150", name: "Image 1" },
    { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", name: "Video 1" },
    { type: "document", src: "/sample.pdf", name: "Document 1" },
  ];

  // Filtered Data Based on Search and Category
  const filteredData = data.filter((item) =>
    (selectedCategory === "all" || item.type === selectedCategory) &&
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        {/* Search Bar */}
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

        {/* Filter Buttons */}
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

        {/* Preview Section */}
        <section className="preview-section">
          <h2>File Preview</h2>
          <div className="preview-grid">
            {filteredData.map((item, index) => (
              <div key={index} className="preview-item">
                {item.type === "image" && <img src={item.src} alt={item.name} />}
                {item.type === "video" && <video controls src={item.src} />}
                {item.type === "document" && (
                  <a href={item.src} target="_blank" rel="noopener noreferrer">
                    📄 {item.name}
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
