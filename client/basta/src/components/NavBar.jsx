import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

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
        {!!user && (
          <h3>
            Hi {user.user.name}!
            <button onClick={handleLogout} className="btn btn-outline-danger">
              Logout
            </button>{" "}
          </h3>
        )}
      </header>
    </div>
  );
};

export default NavBar;
