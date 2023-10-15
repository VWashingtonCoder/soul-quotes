import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUser } from "../context-hooks.ts";
import logo from "../assets/images/logo.png";
import "./styles/Header.scss";

function Header() {
  const { activeUser, logoutActiveUser } = useUser();
  const currentLocation = useLocation();

  return (
    <header className="app-header flex-between-center">
      <div className="logo-box">
        <img src={logo} alt="logo" />
      </div>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li>
            {!activeUser ? (
              <Link to="/accounts/login" className="nav-link">
                Account
              </Link>
            ) : (
              <Link
                to="/"
                className="nav-link"
                onClick={() => logoutActiveUser()}
              >
                Logout
              </Link>
            )}
          </li>

          <li>
            {activeUser ? (
              <Link to="/favorites" className="nav-link">
                Favorites
              </Link>
            ) : (
              <Link
                to={currentLocation}
                className="nav-link"
                onClick={() => toast.error("Log In/Join To Access")}
              >
                Favorites
              </Link>
            )}
          </li>

          <li>
            {activeUser ? (
              <Link to="/create-quote" className="nav-link">
                Create Quote
              </Link>
            ) : (
              <Link
                to={currentLocation}
                className="nav-link"
                onClick={() => toast.error("Log In/Join To Access")}
              >
                Create Quote
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
