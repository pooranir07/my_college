// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventList from "./pages/EventList";
import MyEvents from "./pages/MyEvents";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";

// Admin pages
import Inventory from "./pages/Inventory";
import Users from "./pages/Users";
import Reports from "./pages/Reports";

function AppWrapper() {
  const location = useLocation();

  // Hide Navbar and Footer for admin pages
  const adminPages = ["/dashboard", "/inventory", "/users", "/reports"];
  const hideHeaderFooter = adminPages.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Navbar />}

      <div className="container mt-4">
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Public pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Event pages */}
          <Route path="/events" element={<EventList />} />
          <Route path="/myevents" element={<MyEvents />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/detail/:id" element={<Detail />} /> {/* Pass id as param if needed */}

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Admin Dashboard & Sidebar links */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reports" element={<Reports />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
