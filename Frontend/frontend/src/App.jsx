import React, { use, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all your components
import Login from "./Components/Login";
// import UserHomePage from "./Components/UserHomePage";
import SuperadminDashboard from "./Components/SuperadminDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import EventDetailPage from "./Components/EventDetailPage";
import RegistrationForm from "./Components/RegistrationForm";
import Navbar from "./Components/Navbar";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import UserHomePage from "./Components/UserHomePage";

function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [login, setLogin] = useState(false);
  const storedLogin = localStorage.getItem("loggedIn");
  const [userId, setUserId] = useState(null);
  console.log(localStorage.getItem("userRole"));
  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-100 to-indigo-100 px-4 font-inter">
      {/* {loggedIn && storedLogin === true ? ( */}
        <Navbar
          setLogin={setLogin}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      {/* ) : ( */}
        ""
      {/* )} */}

      <Routes>
        <Route
          path="/login"
          element={
            <Login
              setUserId={setUserId}
              setLogin={setLogin}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route
          path="/"
          element={
            // <UserHomePage/>
            // <ProtectedRoutes allowedRoles={["USER"]}>
              <UserHomePage searchTerm={searchTerm} />
            // </ProtectedRoutes>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route
          path="/register/:id"
          element={<RegistrationForm userId={userId} />}
        />
        <Route
          path="/superadmin"
          element={
            <ProtectedRoutes allowedRoles={["SUPER_ADMIN"]}>
              <SuperadminDashboard />
             </ProtectedRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoutes allowedRoles={["ADMIN"]}>
              <AdminDashboard />
             </ProtectedRoutes>
          }
        />
        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <div className="grid min-h-screen place-items-center text-center text-gray-700">
              <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
              <a
                href="/login"
                className="p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
              >
                Go to Login
              </a>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
