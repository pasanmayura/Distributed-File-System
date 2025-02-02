import React from "react";
import { Download, MoreVertical } from "lucide-react";

const StorageCard = ({ file }) => {
  const handleDownload = () => {
    try {
      const blob = new Blob([new Uint8Array(file.data.data)], { type: file.type });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = decodeURIComponent(file.filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const getFilePreview = () => {
    const base64Data = btoa(
      String.fromCharCode(...new Uint8Array(file.data.data))
    );
    const fileSrc = `data:${file.type};base64,${base64Data}`;

    if (file.type.startsWith("image/")) {
      return <img src={fileSrc} alt={""} className="file-preview-img" />;
    }

    if (file.type.startsWith("video/")) {
      return (
        <video controls className="file-preview-video">
          <source src={fileSrc} type={file.type} />
        </video>
      );
    }

    if (file.type === "application/pdf") {
      return (
        <a href={fileSrc} target="_blank" rel="noopener noreferrer">
          📄 {decodeURIComponent(file.filename)}
        </a>
      );
    }

    return <p>{decodeURIComponent(file.filename)}</p>;
  };

  return (
    <div className="storage-card">
      <div className="card-header">
        <h3 className="file-name">{decodeURIComponent(file.filename)}</h3>
      </div>

      <div className="file-preview">{getFilePreview()}</div>

      <div className="card-footer">
        <button className="download-btn" onClick={handleDownload}>
          <Download size={18} /> Download
        </button>
        <button className="icon-btn">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default StorageCard;