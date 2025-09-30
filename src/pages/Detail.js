import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};

  const [student, setStudent] = useState({
    name: "",
    department: "",
    year: "",
    section: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save registration to localStorage
    const registeredEvents = JSON.parse(localStorage.getItem("myEvents")) || [];
    registeredEvents.push({
      eventId: event.id,
      title: event.title,
      date: event.date,
      studentName: student.name,
      department: student.department,
      year: student.year,
      section: student.section,
    });
    localStorage.setItem("myEvents", JSON.stringify(registeredEvents));

    alert(`Student Registered!\n\nEvent: ${event.title}\nName: ${student.name}`);
    setStudent({ name: "", department: "", year: "", section: "" });

    // Redirect to MyEvents page after registration
    navigate("/myevents");
  };

  if (!event) return <p>Event not found!</p>;

  return (
    <div
      className="container py-5"
      style={{
        minHeight: "100vh",
        fontFamily: "'Segoe UI', sans-serif",
        backgroundImage: "url('/images/campus-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Event Info */}
      <div className="text-center text-light mb-5" style={{ textShadow: "2px 2px 10px rgba(0,0,0,0.8)" }}>
        <h1 className="display-4 fw-bold">{event.title}</h1>
        <p className="lead">{event.category} Event</p>
      </div>

      <div className="card mx-auto shadow-lg p-4 mb-5" style={{ maxWidth: "700px", borderRadius: "20px", backgroundColor: "rgba(255,255,255,0.95)" }}>
        <h4 className="text-primary mb-3">{event.title}</h4>
        <p>{event.description}</p>
        <p><b>Date:</b> {event.date}</p>
        <p><b>Venue:</b> {event.venue}</p>

        <Link
          to="/events"
          className="btn btn-gradient mt-3"
          style={{
            background: "linear-gradient(45deg,#0d6efd,#6610f2)",
            color: "#fff",
            borderRadius: "50px",
            padding: "10px 25px",
            marginRight: "10px",
          }}
        >
          Back to Events
        </Link>
      </div>

      {/* Student Registration Form */}
      <div className="card mx-auto shadow-lg p-4" style={{ maxWidth: "700px", borderRadius: "20px", backgroundColor: "rgba(255,255,255,0.95)" }}>
        <h4 className="text-success mb-4 text-center">Student Registration</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Student Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Department</label>
            <input
              type="text"
              className="form-control"
              name="department"
              value={student.department}
              onChange={handleChange}
              required
              placeholder="Enter your department"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Year</label>
            <select className="form-select" name="year" value={student.year} onChange={handleChange} required>
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Section</label>
            <input
              type="text"
              className="form-control"
              name="section"
              value={student.section}
              onChange={handleChange}
              required
              placeholder="Enter your section"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-success btn-lg"
              style={{
                borderRadius: "50px",
                padding: "10px 30px",
                background: "linear-gradient(45deg,#28a745,#218838)",
                color: "#fff",
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Detail;
