import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const NavBar = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="navbar-container">
      <header className="header">{!!user && <h3>Hi {user.name}!</h3>}</header>
    </div>
  );
};

export default NavBar;
