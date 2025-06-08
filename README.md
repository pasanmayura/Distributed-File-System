# Distributed File System (DocuCloud)

DocuCloud is a distributed file system that allows users to securely upload, manage, and store files such as images, documents, and videos. It uses a combination of MySQL and MongoDB for data storage and provides a user-friendly interface for file management.

## Features

- **User Registration and Login**: Secure user authentication using JWT.
- **File Upload**: Upload images, documents, and videos.
- **File Storage**: Files are stored in MongoDB, while user metadata is stored in MySQL.
- **Preview and Manage Files**: Users can preview uploaded files and manage them through the dashboard.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Technologies Used

### Backend
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building RESTful APIs.
- **MySQL**: Relational database for storing user metadata.
- **MongoDB**: NoSQL database for storing file data.
- **Mongoose**: ODM for MongoDB.
- **Multer**: Middleware for handling file uploads.
- **bcrypt**: Password hashing for secure authentication.
- **jsonwebtoken**: Token-based authentication.

### Frontend
- **React.js**: Frontend library for building the user interface.
- **Axios**: HTTP client for API requests.
- **React Router**: For navigation and routing.
- **CSS**: Custom styling for the application.

---

## Prerequisites

- **Node.js** (v16 or higher)
- **MySQL** (v8 or higher)
- **MongoDB** (Atlas or local instance)
- **npm** (Node Package Manager)

---
## Clone the Repository
   ```bash
   git clone https://github.com/pasanmayura/Distributed-File-System.git
   ``` 
---
## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```   
2. Install dependencies:
   ```bash
   npm install
   ```  
3. Set up the MySQL database:
Create a database named dfs using the provided

4. Start the backend server:
   ```bash
   node Server.js
   ```
   ---
   ## Frontend Setup

5. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```   
6. Install dependencies:
   ```bash
   npm install
   ```  
7. Start the frontend development server:
   ```bash
   npm start
   ```
   ---

## Usage
- Open the application in your browser
   ```bash
   http://localhost:3000
   ```
- Register: Create a new account

- Login: Log in with your credentials

- Dashboard: Upload and manage your files.

   ---
## Project Structure
   ```bash
   Distributed-File-System/
├── backend/
│   ├── Server.js          # Backend server
│   ├── clientTest.js      # Test client for file transfer
│   ├── serverTest.js      # Test server for file transfer
│   ├── sqlQuery.sql       # SQL schema for MySQL
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── public/            # Static files
│   ├── src/               # React source code
│   │   ├── App.js         # Main React component
│   │   ├── Dashboard.js   # Dashboard component
│   │   ├── Login.js       # Login component
│   │   ├── Register.js    # Register component
│   │   ├── Sidebar.js     # Sidebar component
│   │   └── style.css      # Global styles
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
   ```



   