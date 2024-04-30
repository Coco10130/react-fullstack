import { useRef } from "react";
import axios from "../axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const Submit = async (e) => {
    e.preventDefault();
    const payload = {
      userName: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const { data } = await axios.post("/api/auth/register", payload);

      if (data.success) {
        nameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";

        toast.success(data.success);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <Toaster />
      <div className="login">
        <h2 className="login-text">Register</h2>

        <form onSubmit={Submit} className="register-form">
          <input type="text" ref={nameRef} placeholder="Enter user name" />{" "}
          <br />
          <input type="email" ref={emailRef} placeholder="Enter email" /> <br />
          <input
            type="password"
            ref={passwordRef}
            placeholder="Enter password"
          />
          <br />
          <br />
          <button
            type="submit"
            className="register-button btn btn-outline-secondary"
          >
            Register
          </button>
          <p className="login-here">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
