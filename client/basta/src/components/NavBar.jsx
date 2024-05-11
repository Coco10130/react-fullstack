import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useContext(UserContext);

  useEffect(() => {
    if (loading && !user) {
      /* toast.loading("Loading user"); */
    }
  }, [user, loading]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const haldeLogin = () => {};

  const handleSignUp = () => {};

  return (
    <div className="navbar-container">
      <header className="header">
        <div className="row d-flex align-items-center justify-content-center">
          {user ? (
            <>
              <div className="col-10 d-flex align-items-center justify-content-start">
                <img
                  src="/images/anya-img.jpg"
                  alt="User Profile"
                  className="user-img"
                />
                <h3 className="user-name">{user.user.name}</h3>
              </div>
              <div className="col">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={(e) => haldeLogin}
                className="navbar-login btn btn-outline-secondary"
              >
                Login
              </button>
              <button
                onClick={(e) => handleSignUp}
                className="navbar-login btn btn-outline-secondary"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavBar;
