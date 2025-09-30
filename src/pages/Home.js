import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {
  const slides = ["/images/camp.jpg", "/images/gal2.jpg", "/images/gal3.jpg"];
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Auto slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Browse Events button logic
  const handleBrowseEvents = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
      navigate("/events");
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Hero Slider */}
      <header
        className="text-center text-light d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${slides[currentSlide]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          position: "relative",
          transition: "background-image 1s ease-in-out",
        }}
      >
        <div
          className="overlay position-absolute w-100 h-100"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
          }}
        ></div>
        <div className="position-relative text-center px-3">
          <motion.h1
            className="display-3 fw-bold"
            style={{ textShadow: "2px 2px 15px rgba(0,0,0,0.8)" }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            RTS College Event Management 🎉
          </motion.h1>
          <motion.p
            className="lead fs-4"
            style={{ textShadow: "1px 1px 7px rgba(0,0,0,0.7)" }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            Explore, Connect, and Be Part of Our Vibrant College Life
          </motion.p>
          <motion.button
            onClick={handleBrowseEvents}
            className="btn btn-warning btn-lg fw-bold mt-3"
            style={{
              boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
              borderRadius: "50px",
              padding: "12px 35px",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0,0,0,0.5)" }}
          >
            Browse Events
          </motion.button>
        </div>
      </header>

      {/* About Our College */}
      <section className="container my-5">
        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <motion.div
              className="card shadow-lg border-0 h-100 text-light"
              style={{
                backgroundImage: "url('/images/camp.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "15px",
              }}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div
                className="card-body"
                style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "15px" }}
              >
                <h2 className="fw-bold text-warning">About Our Campus</h2>
                <p>
                  Our sprawling campus offers state-of-the-art facilities including modern classrooms, well-equipped labs, library, auditorium, and sports arenas. 
                  Students are encouraged to learn, innovate, and grow in a vibrant, supportive environment.
                  Our sprawling campus offers state-of-the-art facilities including modern classrooms, well-equipped labs, library, auditorium, and sports arenas. 
                  Students are encouraged to learn, innovate, and grow in a vibrant, supportive environment.
                  Our sprawling campus offers state-of-the-art facilities including modern classrooms, well-equipped labs, library, auditorium, and sports arenas. 
                  Students are encouraged to learn, innovate, and grow in a vibrant, supportive environment.
                </p>
              </div>
            </motion.div>
          </div>
          <div className="col-md-6">
            <motion.h2
              className="fw-bold text-primary mb-3"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Why Choose RTS?
            </motion.h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item shadow-sm mb-2 rounded">✅ Modern Campus & Labs</li>
              <li className="list-group-item shadow-sm mb-2 rounded">✅ Experienced Faculty</li>
              <li className="list-group-item shadow-sm mb-2 rounded">✅ Cultural & Technical Fests</li>
              <li className="list-group-item shadow-sm mb-2 rounded">✅ Sports & Competitions</li>
              <li className="list-group-item shadow-sm mb-2 rounded">✅ Innovative Learning Programs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Faculties Section */}
      <section className="container my-5">
        <motion.h2
          className="text-center fw-bold text-primary mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Meet Our Faculty 👩‍🏫
        </motion.h2>
        <div className="row g-4">
          {[
            { name: "Dr. R. Sharma", role: "Principal", img: "/images/fac4.jpg" },
            { name: "Prof. M. Rao", role: "Head of Computer Science", img: "/images/fac2.jpg" },
            { name: "Dr. A. Mehta", role: "Cultural Head", img: "/images/fac3.jpg" },
          ].map((faculty, idx) => (
            <div className="col-md-4" key={idx}>
              <motion.div
                className="card shadow-lg border-0 text-center"
                style={{ borderRadius: "15px", overflow: "hidden", cursor: "pointer" }}
                whileHover={{ scale: 1.05 }}
              >
                <img src={faculty.img} alt={faculty.name} className="img-fluid" />
                <div className="card-body">
                  <h5 className="fw-bold">{faculty.name}</h5>
                  <p className="text-muted">{faculty.role}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Teaching Quality Section */}
      <section className="container my-5 py-5" style={{ backgroundColor: "#f5f5f5", borderRadius: "20px" }}>
        <motion.h2
          className="text-center fw-bold text-primary mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Our Teaching Excellence 📚
        </motion.h2>
        <div className="row text-center">
          {[ 
            { title: "Interactive Classes", icon: "🖥️" },
            { title: "Industry Projects", icon: "💡" },
            { title: "Mentorship", icon: "👨‍🏫" },
            { title: "Workshops & Seminars", icon: "🛠️" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="col-md-3 mb-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: idx * 0.3 }}
            >
              <div
                className="shadow-sm p-4 rounded-3 bg-white h-100"
                style={{ transition: "all 0.3s", cursor: "pointer" }}
              >
                <div style={{ fontSize: "2rem" }}>{item.icon}</div>
                <h6 className="fw-bold mt-2">{item.title}</h6>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Events Showcase */}
      <section className="container my-5">
        <motion.h2
          className="text-center fw-bold text-primary mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Past Events Highlights 🎉
        </motion.h2>
        <div className="row g-4">
          {["gal1.jpg", "gal2.jpg", "gal3.jpg", "gal4.jpg"].map((img, i) => (
            <div className="col-md-3" key={i}>
              <motion.div
                className="card border-0 shadow-lg overflow-hidden"
                style={{ borderRadius: "15px", cursor: "pointer" }}
                whileHover={{ scale: 1.05 }}
              >
                <img src={`/images/${img}`} alt={`Event ${i + 1}`} className="img-fluid" />
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
