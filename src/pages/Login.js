import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Admin credentials
    const adminEmail = "admin123@gmail.com";
    const adminPassword = "admin123@";

    if (form.email === adminEmail && form.password === adminPassword) {
      // Set login flag
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ name: "Admin", email: adminEmail }));

      alert(`Welcome, Admin!`);
      navigate("/dashboard"); // Go to dashboard
    } else {
      // For all other users, redirect to Home
      alert("You are not admin. Redirecting to Home.");
      localStorage.setItem("isLoggedIn", "false");
      navigate("/"); // Redirect to Home page
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      <div className="card p-5 shadow-lg" style={{ width: "400px", borderRadius: "20px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="form-control mb-3"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="form-control mb-4"
            required
          />
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
