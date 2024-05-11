import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
                  onClick={() => navigate("/profile")}
                  className="user-img"
                />
                <h3 className="user-name">{user.user.name}</h3>
              </div>

              <div className="col-2 d-flex align-items-center justify-content-center">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-bars"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/product")}
                      >
                        Products
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/todo-list")}
                      >
                        Todo List
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/")}
                      >
                        Dashboard
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/gallery")}
                      >
                        Gallery
                      </button>
                    </li>
                  </ul>
                </div>
                <br />

                <button
                  onClick={handleLogout}
                  className="logout-btn btn btn-outline-danger"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="col-10"></div>
              <div className="col-2">
                <button
                  onClick={(e) => navigate("/login")}
                  className="navbar-login btn btn-outline-secondary"
                >
                  Login
                </button>
                <button
                  onClick={(e) => navigate("/register")}
                  className="navbar-login btn btn-outline-secondary"
                >
                  Sign up
                </button>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavBar;
