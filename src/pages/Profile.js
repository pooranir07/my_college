import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    section: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login"); // Redirect if not logged in
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("✅ Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center py-5"
      style={{
        minHeight: "100vh",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          width: "100%",
          maxWidth: "650px",
          borderRadius: "25px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        {/* Avatar */}
        <div className="d-flex justify-content-center mb-4">
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: "700",
              color: "#666",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            {user.name ? user.name[0].toUpperCase() : "👤"}
          </div>
        </div>

        <h2 className="text-center fw-bold text-primary mb-4">
          🎓 Student Profile
        </h2>

        <form onSubmit={handleSave}>
          {["name", "email", "department", "year", "section"].map((field) => (
            <div className="mb-3" key={field}>
              <label
                className="form-label fw-semibold text-secondary"
                style={{
                  textTransform: "capitalize",
                  fontSize: "0.9rem",
                  letterSpacing: "0.5px",
                }}
              >
                {field}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={user[field] || ""}
                onChange={handleChange}
                className="form-control shadow-sm"
                style={{
                  borderRadius: "15px",
                  padding: "12px 18px",
                  fontSize: "0.95rem",
                  border: "1px solid #ccc",
                  transition: "all 0.3s",
                }}
              />
            </div>
          ))}

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button
              type="submit"
              className="btn flex-grow-1 me-2"
              style={{
                borderRadius: "30px",
                padding: "12px 0",
                fontWeight: "600",
                background:
                  "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
                color: "#fff",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                transition: "all 0.3s",
              }}
            >
              💾 Save
            </button>

            <button
              type="button"
              className="btn flex-grow-1 ms-2"
              style={{
                borderRadius: "30px",
                padding: "12px 0",
                fontWeight: "600",
                background: "linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)",
                color: "#fff",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                transition: "all 0.3s",
              }}
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
