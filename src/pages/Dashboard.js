import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const menuItems = [
    { icon: "bi-speedometer2", label: "Dashboard", to: "/dashboard" },
    { icon: "bi-box", label: "Events", to: "/inventory" },
    { icon: "bi-people", label: "Users", to: "/users" },
    { icon: "bi-bar-chart", label: "Reports", to: "/reports" },
  ];

  return (
    <div
      style={{
        display: "flex",
        fontFamily: "'Segoe UI', sans-serif",
        minHeight: "100vh",
        background: "#f4f6f9",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#0d6efd",
          color: "#fff",
          padding: "12px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 className="m-0 fw-bold">📦 College Event Dashboard</h3>
        <div>
          <span className="me-3">
            {user.name || "Admin"} ({user.email || "admin@demo.com"})
          </span>
          <button onClick={handleLogout} className="btn btn-light btn-sm fw-bold">
            Logout
          </button>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div
          style={{
            width: sidebarOpen ? "260px" : "0",
            background: "#1f2937",
            color: "#fff",
            transition: "width 0.3s",
            overflow: "hidden",
            paddingTop: "30px",
            boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          }}
        >
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) =>
                `d-block text-light px-4 py-3 mb-2 rounded fw-semibold ${
                  isActive ? "bg-primary" : "hover-bg-secondary"
                }`
              }
              style={{ textDecoration: "none", fontSize: "0.95rem" }}
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "30px" }}>
          <button
            className="btn btn-secondary mb-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </button>

          {/* Dashboard Info */}
          <section>
            <h2 className="fw-bold text-primary">Welcome, {user.name || "Admin"}!</h2>
            <p className="text-muted">Email: {user.email || "admin@demo.com"}</p>

            <div className="mt-4 p-4 bg-white rounded shadow-sm">
              <h4 className="fw-semibold">📌 Dashboard Overview</h4>
              <p className="text-muted">
                Use the sidebar to navigate, or click the buttons below.
              </p>

              {/* Buttons for Events, Users, Reports */}
              <div className="mt-3 d-flex gap-3 flex-wrap">
                <button
                  className="btn btn-primary dashboard-btn"
                  onClick={() => navigate("/inventory")}
                >
                  <i className="bi bi-box me-2"></i> Events
                </button>
                <button
                  className="btn btn-success dashboard-btn"
                  onClick={() => navigate("/users")}
                >
                  <i className="bi bi-people me-2"></i> Users
                </button>
                <button
                  className="btn btn-warning dashboard-btn text-dark"
                  onClick={() => navigate("/reports")}
                >
                  <i className="bi bi-bar-chart me-2"></i> Reports
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          background: "#1f2937",
          color: "#fff",
          textAlign: "center",
          padding: "12px",
          marginTop: "auto",
        }}
      >
        © {new Date().getFullYear()} College Event Management | All Rights Reserved
      </footer>

      {/* Custom Styles */}
      <style>
        {`
          .hover-bg-secondary:hover {
            background: #374151 !important;
          }

          .dashboard-btn {
            min-width: 150px;
            padding: 12px 20px;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
          }

          .dashboard-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 10px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
}

export default Dashboard;
