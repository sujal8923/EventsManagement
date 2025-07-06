import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Import all your components
import Login from './Components/Login';
import UserHomePage from './Components/UserHomePage';
import SuperadminDashboard from './Components/SuperadminDashboard';
import AdminDashboard from './Components/AdminDashboard';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import EventDetailPage from './Components/EventDetailPage';
import RegistrationForm from './Components/RegistrationForm';
import Navbar from './Components/Navbar';

// Main App component that wraps the routing
function AppContent() {
  const navigate = useNavigate();
  // Initialize states from localStorage on component mount
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  // This effect runs once on mount to handle initial redirection based on persisted state
  // and also when isLoggedIn or userRole changes
  useEffect(() => {
    // If not logged in and not on the login page, redirect to login.
    // This handles direct URL access to protected routes when not authenticated.
    if (!isLoggedIn && window.location.pathname !== '/') {
      navigate('/');
    }
    // If logged in but on the login page, redirect to the appropriate dashboard/home.
    // This prevents logged-in users from seeing the login page.
    if (isLoggedIn && window.location.pathname === '/') {
      if (userRole === 'superadmin') {
        navigate('/superadmin');
      } else if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    }
  }, [isLoggedIn, userRole, navigate]);


  // This function handles successful logins and redirects based on role
  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    // Persist login state and role in localStorage
    localStorage.setItem('userRole', role);
    localStorage.setItem('isLoggedIn', 'true');

    // Navigate immediately after state update and localStorage persistence
    if (role === 'superadmin') {
      navigate('/superadmin');
    } else if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/home'); // User home page
    }
  };

  // This function handles logout
  const handleLogout = () => {
    setUserRole(null);
    setIsLoggedIn(false);
    // Clear login state from localStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    setSearchTerm(''); // Clear search term on logout
    navigate('/'); // Redirect to login page
  };

  // Component to protect routes
  const ProtectedRoute = ({ children, allowedRoles }) => {
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
      // The useEffect in AppContent already handles the initial redirect.
      // This is a redundant check for immediate render, but good for clarity.
      return null; // Don't render children
    }

    // If roles are specified, check if the current user's role is allowed
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      // If not authorized, redirect to home or a forbidden page
      useEffect(() => {
        // Redirect to user home if not authorized for admin/superadmin pages
        if (userRole === 'user') {
          navigate('/home');
        } else if (userRole === 'admin') {
          navigate('/admin'); // Admin trying to access superadmin page
        } else {
          navigate('/'); // General fallback
        }
      }, [navigate, userRole]);
      return null;
    }

    return children; // Render children if logged in and authorized
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-100 to-indigo-100 px-4 font-inter">
      {/* Navbar will be rendered on all pages except login */}
      {isLoggedIn && <Navbar handleLogout={handleLogout} userRole={userRole} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}

      <Routes>
        <Route path="/" element={
          <div className="grid min-h-screen place-items-center">
            {/* Only render Login if not already logged in */}
            {!isLoggedIn ? <Login onLoginSuccess={handleLoginSuccess} /> : null}
          </div>
        } />

        {/* Protected Routes */}
        {/* User Role specific protection added */}
        {/* Pass searchTerm to UserHomePage */}
        <Route path="/home" element={<ProtectedRoute allowedRoles={['user', 'admin', 'superadmin']}><UserHomePage handleLogout={handleLogout} searchTerm={searchTerm} /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute allowedRoles={['user', 'admin', 'superadmin']}><AboutUs handleLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute allowedRoles={['user', 'admin', 'superadmin']}><ContactUs handleLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/event/:id" element={<ProtectedRoute allowedRoles={['user', 'admin', 'superadmin']}><EventDetailPage handleLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/register/:id" element={<ProtectedRoute allowedRoles={['user', 'admin', 'superadmin']}><RegistrationForm handleLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/superadmin" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperadminDashboard handleLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin', 'superadmin']}><AdminDashboard handleLogout={handleLogout} /></ProtectedRoute>} />

        {/* Fallback for unknown routes */}
        <Route path="*" element={
          <div className="grid min-h-screen place-items-center text-center text-gray-700">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <button
              onClick={() => navigate(isLoggedIn ? (userRole === 'superadmin' ? '/superadmin' : userRole === 'admin' ? '/admin' : '/home') : '/')}
              className="p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              Go to {isLoggedIn ? 'Dashboard/Home' : 'Login'}
            </button>
          </div>
        } />
      </Routes>
    </div>
  );
}

// Wrap AppContent with BrowserRouter
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
