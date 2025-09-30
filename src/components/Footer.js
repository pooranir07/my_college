// src/components/Footer.js
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="text-light pt-5 pb-3"
      style={{ background: "linear-gradient(135deg, #0d6efd, #6610f2)" }}
    >
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">About RTS College</h5>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6", color: "rgba(255,255,255,0.85)" }}>
              RTS College provides a platform for students, faculty, and staff to
              showcase talents, share knowledge, and create unforgettable memories.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              {["Home", "Events", "Gallery", "Contact"].map((link, idx) => (
                <li key={idx} className="mb-2">
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="text-light text-decoration-none"
                    style={{ transition: "color 0.3s" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#ffc107")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "white")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Contact Info</h5>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6", color: "rgba(255,255,255,0.85)" }}>
              📍 Main Campus, City Road, Chennai – 600001 <br />
              📧{" "}
              <a
                href="mailto:info@rtscollege.edu"
                className="text-warning text-decoration-none"
              >
                info@rtscollege.edu
              </a>
              <br />
              📞 +91 98765 43210
            </p>
          </div>

          {/* Social & Newsletter */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Connect With Us</h5>
            <div className="mb-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                (Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-light me-3"
                    style={{ fontSize: "1.3rem", transition: "all 0.3s" }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#ffc107";
                      e.currentTarget.style.transform = "scale(1.3)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>

            <h6 className="fw-bold mb-2">Subscribe</h6>
            <form className="d-flex">
              <input
                type="email"
                placeholder="Your email"
                className="form-control me-2 rounded-pill"
                style={{ padding: "5px 15px" }}
              />
              <button className="btn btn-warning rounded-pill">Subscribe</button>
            </form>
          </div>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />

        <div
          className="text-center"
          style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}
        >
          &copy; {new Date().getFullYear()} RTS College. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
