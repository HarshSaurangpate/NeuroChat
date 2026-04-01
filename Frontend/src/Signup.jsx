import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

function Signup({ setIsOpen }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/signup", form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
  <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#212121",
      color: "#fff",
      overflow: "hidden"
    }}
  >

    {/* Navbar */}
    <Navbar setIsOpen={setIsOpen} />

    {/* Content */}
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px"
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#2a2a2a",
          padding: "24px",
          borderRadius: "8px"
        }}
      >

        <h3 className="text-center mb-2">Create account</h3>
        <p className="text-center text-secondary mb-4">
          Join NeuroChat
        </p>

        {/* Name */}
        <input
          type="text"
          className="form-control mb-3"
          style={{ backgroundColor: "#2f2f2f", color: "#fff", border: "none" }}
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Email */}
        <input
          type="email"
          className="form-control mb-3"
          style={{ backgroundColor: "#2f2f2f", color: "#fff", border: "none" }}
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          className="form-control mb-3"
          style={{ backgroundColor: "#2f2f2f", color: "#fff", border: "none" }}
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="btn w-100 mb-3"
          style={{ backgroundColor: "#171717", color: "#fff" }}
          onClick={handleSignup}   // 🔥 changed
        >
          Sign up
        </button>

        <p className="text-center small">
          Already have an account?{" "}
          <span
            style={{ color: "#fff", cursor: "pointer" }}
            onClick={() => navigate("/login")}   // 🔥 changed
          >
            Login
          </span>
        </p>

      </div>

    </div>
  </div>
);
}

export default Signup;