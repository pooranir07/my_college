import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load users initially and whenever localStorage changes
  const loadUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  };

  useEffect(() => {
    loadUsers();
    // Listen for storage changes (works if users register in another tab)
    window.addEventListener("storage", loadUsers);
    return () => window.removeEventListener("storage", loadUsers);
  }, []);

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

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
          <h1 className="fw-bold text-primary">Registered Users</h1>
          <p className="text-muted">List of all registered students</p>
        </div>

        <div style={{ overflowX: "auto", borderRadius: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", background: "#fff" }}>
          <table className="table mb-0">
            <thead style={{ background: "#0d6efd", color: "#fff" }}>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">No users registered yet.</td>
                </tr>
              )}
              {users.map((user, index) => (
                <tr key={index} style={{ transition: "all 0.3s" }}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      style={{ borderRadius: "50px" }}
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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

export default Users;
