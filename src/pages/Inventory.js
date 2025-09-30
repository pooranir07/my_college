import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Inventory() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", date: "", venue: "", category: "" });
  const [editId, setEditId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state

  // Load events from localStorage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  // Save events to localStorage
  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      // Edit event
      const updatedEvents = events.map(ev =>
        ev.id === editId ? { ...form, id: editId } : ev
      );
      saveEvents(updatedEvents);
      setEditId(null);
    } else {
      // Add new event
      const newEvent = { ...form, id: Date.now() };
      saveEvents([...events, newEvent]);
    }
    setForm({ title: "", description: "", date: "", venue: "", category: "" });
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      date: event.date,
      venue: event.venue,
      category: event.category
    });
    setEditId(event.id);
  };

  const handleDelete = (id) => {
    const updatedEvents = events.filter(ev => ev.id !== id);
    saveEvents(updatedEvents);
  };

  const menuItems = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Events", to: "/inventory" },
    { label: "Users", to: "/users" },
    { label: "Reports", to: "/reports" },

  ];

  // 🔍 Filtered events
  const filteredEvents = events.filter(ev =>
    ev.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? "260px" : "0",
          background: "#1f2937",
          color: "#fff",
          height: "100vh",
          transition: "width 0.3s",
          overflow: "hidden",
          paddingTop: "30px",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
        }}
      >
        <h4 className="text-center mb-5" style={{ fontWeight: "700", letterSpacing: "1px" }}>
          📦 Admin Dashboard
        </h4>
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
            {item.label}
          </NavLink>
        ))}
        <button
          onClick={() => { localStorage.removeItem("isLoggedIn"); navigate("/login"); }}
          className="btn btn-danger w-75 mx-auto mt-4 d-block fw-bold"
          style={{ borderRadius: "50px", padding: "8px 0", transition: "0.3s" }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px", background: "#f4f6f9" }}>
        <button
          className="btn btn-secondary mb-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ transition: "0.3s" }}
        >
          {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
        </button>

        <h2 className="mb-4">Manage Events</h2>

        {/* Event Form */}
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-3">
            <input type="text" name="title" placeholder="Event Title" value={form.title} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <textarea name="description" placeholder="Event Description" value={form.description} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3 d-flex gap-3">
            <input type="date" name="date" value={form.date} onChange={handleChange} className="form-control" required />
            <input type="text" name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} className="form-control" required />
            <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary">{editId !== null ? "Update Event" : "Add Event"}</button>
        </form>

        {/* 🔍 Search Bar */}
        <div className="mb-3 d-flex justify-content-between">
          <h5 className="fw-bold">Event List</h5>
          <input
            type="text"
            className="form-control"
            placeholder="Search by event title..."
            style={{ maxWidth: "300px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Event Table */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">No matching events found.</td>
              </tr>
            ) : (
              filteredEvents.map(ev => (
                <tr key={ev.id}>
                  <td>{ev.title}</td>
                  <td>{ev.description}</td>
                  <td>{ev.date}</td>
                  <td>{ev.venue}</td>
                  <td>{ev.category}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(ev)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(ev.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Extra CSS for sidebar hover */}
      <style>
        {`
          .hover-bg-secondary:hover {
            background: #374151 !important;
          }
        `}
      </style>
    </div>
  );
}

export default Inventory;
