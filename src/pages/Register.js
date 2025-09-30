import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user in localStorage (supports multiple users)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert(`Registered Successfully: ${form.name}`);
    navigate("/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #6610f2)",
        fontFamily: "'Segoe UI', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Floating circles */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          left: "-50px",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          animation: "float 6s ease-in-out infinite alternate",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          right: "-60px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          animation: "float 8s ease-in-out infinite alternate-reverse",
        }}
      ></div>

      {/* Registration Card */}
      <div
        className="card shadow-lg p-5"
        style={{
          width: "450px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h3
          className="text-center mb-4"
          style={{
            fontWeight: "700",
            color: "#0d6efd",
            textShadow: "1px 1px 5px rgba(0,0,0,0.2)",
          }}
        >
          Student Registration
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="form-control mb-3"
            style={{
              borderRadius: "50px",
              padding: "12px 20px",
              border: "1px solid #ccc",
              transition: "all 0.3s",
            }}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="form-control mb-3"
            style={{
              borderRadius: "50px",
              padding: "12px 20px",
              border: "1px solid #ccc",
              transition: "all 0.3s",
            }}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="form-control mb-4"
            style={{
              borderRadius: "50px",
              padding: "12px 20px",
              border: "1px solid #ccc",
              transition: "all 0.3s",
            }}
            required
          />
          <button
            type="submit"
            className="btn w-100 fw-bold"
            style={{
              background: "linear-gradient(45deg,#0d6efd,#6610f2)",
              color: "#fff",
              borderRadius: "50px",
              padding: "12px 0",
              fontSize: "1.1rem",
              transition: "all 0.3s",
              boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.3)";
            }}
          >
            Register
          </button>
        </form>
        <p
          className="text-center mt-3"
          style={{ fontSize: "0.9rem", color: "#666" }}
        >
          Already have an account?{" "}
          <a
            href="/login"
            style={{ color: "#6610f2", textDecoration: "underline" }}
          >
            Login here
          </a>
        </p>
      </div>

      {/* Floating animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            100% { transform: translateY(20px); }
          }
        `}
      </style>
    </div>
  );
}

export default Register;
