import { useRef } from "react";
import axios from "../axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const { data } = await axios.post("/api/auth/login", payload);

      if (data.message) {
        toast.error(data.message);
      } else {
        navigate("/");
        toast.success("Login Success");
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <div className="login-container">
      <Toaster />
      <div className="login">
        <h2 className="login-text">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="email" ref={email} placeholder="Enter Email" />
          <br />
          <input type="password" ref={password} placeholder="Enter Password" />
          <br />
          <input
            type="submit"
            className="login-button btn btn-outline-secondary m-5"
          />

          <p className="register-here">
            No Account yet? <Link to="/register">Register Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
