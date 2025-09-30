import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function EventList() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // Load events dynamically from localStorage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  // Navigate to detail page with event info
  const registerEvent = (event) => {
    navigate(`/detail/${event.id}`, { state: { event } });
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        minHeight: "100vh",
        backgroundImage: "url('/images/camp.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "60px 20px",
      }}
    >
      <div className="text-center text-light mb-5" style={{ textShadow: "2px 2px 10px rgba(0,0,0,0.8)" }}>
        <h1 className="display-3 fw-bold animate__animated animate__fadeInDown">
          🎉 Upcoming College Events
        </h1>
        <p className="lead animate__animated animate__fadeInUp">
          Join, Explore, and Participate in Our Vibrant College Life
        </p>
      </div>

      <div style={{ width: "80px", height: "4px", margin: "0 auto 40px", background: "linear-gradient(90deg,#0d6efd,#6610f2)", borderRadius: "2px" }}></div>

      <div className="row">
        {events.map(event => (
          <div className="col-md-4 mb-5" key={event.id}>
            <div
              className="card h-100 shadow-lg"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "rgba(255,255,255,0.95)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
              }}
            >
              <div className="card-body d-flex flex-column">
                <span
                  className="badge mb-2"
                  style={{
                    background: event.category === "Tech" ? "#0d6efd" :
                                event.category === "Cultural" ? "#6610f2" : "#198754",
                    color: "white",
                    fontWeight: "500",
                    padding: "5px 12px",
                    borderRadius: "12px",
                    alignSelf: "flex-start",
                  }}
                >
                  {event.category}
                </span>

                <h5 className="card-title fw-bold text-primary">{event.title}</h5>
                <p className="card-text text-dark flex-grow-1">{event.description}</p>
                <p className="mb-1"><b>Date:</b> {event.date}</p>
                <p className="mb-3"><b>Venue:</b> {event.venue}</p>

                <button
                  className="btn btn-gradient fw-bold mt-auto"
                  style={{
                    background: "linear-gradient(45deg, #0d6efd, #6610f2)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50px",
                    padding: "10px 25px",
                    transition: "all 0.3s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onClick={() => registerEvent(event)}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
