import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

function Login({ setIsOpen }) {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      alert("Login failed");
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

          <h3 className="text-center mb-2">Welcome back</h3>
          <p className="text-center text-secondary mb-4">
            Login to NeuroChat
          </p>

          <input
            type="email"
            className="form-control mb-3"
            style={{ backgroundColor: "#2f2f2f", color: "#fff", border: "none" }}
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

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
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="text-center small">
            Don’t have an account?{" "}
            <span
              style={{ color: "#fff", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;