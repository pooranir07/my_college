import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function MyEvents() {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("myEvents")) || [];
    setRegisteredEvents(events);
  }, []);

  if (registeredEvents.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#0f172a", color: "#fff" }}>
        <h3>You haven't registered for any events yet.</h3>
      </div>
    );
  }

  return (
    <div
      className="container py-5"
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        minHeight: "100vh",
        background: "linear-gradient(120deg, #0f172a, #1e293b)",
      }}
    >
      <h2
        className="text-center mb-5 text-white"
        style={{ fontSize: "2.5rem", fontWeight: "700", textShadow: "2px 2px 12px rgba(0,0,0,0.7)" }}
      >
        My Registered Events
      </h2>

      <div className="row g-4">
        {registeredEvents.map((event, idx) => (
          <motion.div
            key={idx}
            className="col-12 col-md-6 col-lg-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(0,0,0,0.5)" }}
              className="card h-100 p-4"
              style={{
                borderRadius: "20px",
                background: "linear-gradient(145deg, #1e293b, #0f172a)",
                border: "2px solid rgba(255,255,255,0.1)",
                color: "#fff",
                transition: "all 0.3s",
                position: "relative",
              }}
            >
              <div className="mb-3">
                <h4 style={{ fontWeight: "700", color: "#facc15" }}>{event.title}</h4>
                <p className="mb-1"><strong>Student:</strong> {event.studentName}</p>
                <p style={{ fontSize: "0.9rem" }}>
                  <strong>Dept:</strong> {event.department} | <strong>Year:</strong> {event.year} | <strong>Section:</strong> {event.section}
                </p>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  background: "linear-gradient(45deg, #0d6efd, #6610f2)",
                  padding: "6px 15px",
                  borderRadius: "50px",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                }}
              >
                {event.date}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default MyEvents;
