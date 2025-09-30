import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navLinkStyle = (path) => ({
    color: location.pathname === path ? "#ffc107" : "white",
    fontWeight: "500",
    margin: "0 10px",
    padding: "5px 10px",
    borderBottom: location.pathname === path ? "2px solid #ffc107" : "2px solid transparent",
    transition: "all 0.3s",
  });

  return (
    <nav
      className="navbar navbar-expand-lg shadow"
      style={{
        background: "linear-gradient(90deg, #0d6efd, #6610f2)", // Solid gradient always
        padding: "0.8rem 1rem",
      }}
    >
      <div className="container">
        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand fw-bold d-flex align-items-center"
          style={{
            fontSize: "1.6rem",
            letterSpacing: "1px",
            color: "white",
            textShadow: "1px 1px 5px rgba(0,0,0,0.5)",
          }}
        >
          🎓 RTS Events
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {[
              { name: "Home", path: "/" },
              { name: "Events", path: "/events" },
              { name: "My Events", path: "/myevents" },
              { name: "Profile", path: "/profile" },
            ].map((item, idx) => (
              <li className="nav-item" key={idx}>
                <Link
                  to={item.path}
                  className="nav-link"
                  style={navLinkStyle(item.path)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#ffc107";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color =
                      location.pathname === item.path ? "#ffc107" : "white";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Right buttons */}
            <li className="nav-item ms-3">
              <Link
                to="/login"
                className="btn btn-outline-light btn-sm fw-bold me-2"
                style={{
                  borderRadius: "25px",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffc107";
                  e.currentTarget.style.color = "#000";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "white";
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-warning btn-sm fw-bold"
                style={{
                  borderRadius: "25px",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
