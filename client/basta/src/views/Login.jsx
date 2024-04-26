import { useState } from "react";
import axios from "../axios";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    e.preventDefault();
    try {
      await axios.post("/api/auth", login);
      setLogin({
        email: "",
        password: "",
      });
      console.log("login successful");
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2 className="login-text">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            placeholder="Enter email"
          />{" "}
          <br />
          <input
            type="password"
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            placeholder="Enter password"
          />{" "}
          <br />
          <p className="forgot-password">forgot password</p>
          <button
            type="submit"
            className="login-button btn btn-outline-secondary"
          >
            Login
          </button>
          <p className="register-here">No Account yet? Register here</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
