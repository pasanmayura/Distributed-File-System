import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Storage from './storage'; 
import { Dashboard } from './Dashboard'; 
import Login from './Login'; 
import Register from './Register';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect to /Login if the user visits the root route */}
        <Route path="/" element={<Navigate to="/Login" />} />
        
         {/* Route for the storage */}
        <Route path="/Storage" element={<Storage />} />
        
        
        {/* Route for the dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Route for login */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
