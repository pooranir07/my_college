import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Reports() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 search state

  const loadRegistrations = () => {
    const storedRegistrations = JSON.parse(localStorage.getItem("myEvents")) || [];
    setRegistrations(storedRegistrations);
  };

  useEffect(() => {
    loadRegistrations();
    window.addEventListener("storage", loadRegistrations);
    return () => window.removeEventListener("storage", loadRegistrations);
  }, []);

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

  // 🔍 Filter registrations by student name or event title
  const filteredRegistrations = registrations.filter((reg) =>
    reg.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reg.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f4f6f9" }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? "260px" : "0",
        background: "#1f2937",
        color: "#fff",
        height: "100vh",
        transition: "width 0.3s",
        overflow: "hidden",
        paddingTop: "30px",
        boxShadow: "2px 0 8px rgba(0,0,0,0.1)"
      }}>
        <h4 className="text-center mb-5" style={{ fontWeight: "700", letterSpacing: "1px" }}>📦 Admin Dashboard</h4>
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.to}
            className={({ isActive }) =>
              `d-block text-light px-4 py-3 mb-2 rounded fw-semibold ${isActive ? "bg-primary" : "hover-bg-secondary"}`
            }
            style={{ textDecoration: "none", fontSize: "0.95rem" }}
          >
            <i className={`bi ${item.icon} me-2`}></i>
            {item.label}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="btn btn-danger w-75 mx-auto mt-4 d-block fw-bold"
          style={{ borderRadius: "50px", padding: "8px 0", transition: "0.3s" }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        <button
          className="btn btn-secondary mb-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ transition: "0.3s" }}
        >
          {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
        </button>

        <div className="text-center mb-5">
          <h1 className="fw-bold text-primary">Event Registration Reports</h1>
          <p className="text-muted">Summary of all students registered for events</p>
        </div>

        <div className="mb-4 d-flex justify-content-between align-items-center">
          <h4>
            Total Registrations: <span className="text-success">{registrations.length}</span>
          </h4>
          {/* 🔍 Search Input */}
          <input
            type="text"
            className="form-control"
            placeholder="Search by student name or event"
            style={{ maxWidth: "300px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ overflowX: "auto", borderRadius: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", background: "#fff" }}>
          <table className="table mb-0">
            <thead style={{ background: "#0d6efd", color: "#fff" }}>
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Year</th>
                <th>Section</th>
                <th>Event Title</th>
                <th>Event Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg, index) => (
                  <tr key={index} style={{ transition: "all 0.3s" }}>
                    <td>{index + 1}</td>
                    <td>{reg.studentName}</td>
                    <td>{reg.department}</td>
                    <td>{reg.year}</td>
                    <td>{reg.section}</td>
                    <td>{reg.title}</td>
                    <td>{reg.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .hover-bg-secondary:hover { background: #374151 !important; }
        table tr:hover { background: rgba(13,110,253,0.1); }
      `}</style>
    </div>
  );
}

export default Reports;
