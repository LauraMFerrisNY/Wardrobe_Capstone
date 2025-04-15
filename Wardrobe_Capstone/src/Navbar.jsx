import { Link } from "react-router-dom";
import "./stylesheets/Navbar.css";
import LOGO from "./assets/Wardrobe_App_Logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={LOGO} alt="Home" height="80rem" />
        </Link>
      </div>
      <div className="namebar">
        <Link to="./login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
