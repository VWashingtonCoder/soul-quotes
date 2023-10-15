import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUser } from "../context-hooks.ts";

function Header() {
  const { activeUser, logoutActiveUser } = useUser();
  const currentLocation = useLocation();

  return (
    <div id="Header">
      <div>
        <img src="" alt="logo" />
      </div>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            {!activeUser ? (
              <Link to="/accounts/login">Account</Link>
            ) : (
              <Link to="/" onClick={() => logoutActiveUser()}>
                Logout
              </Link>
            )}
          </li>

          <li>
            {activeUser ? (
              <Link to="/favorites">Favorites</Link>
            ) : (
              <Link
                to={currentLocation}
                onClick={() => toast.error("Log In/Join To Access")}
              >
                Favorites
              </Link>
            )}
          </li>

          <li>
            {activeUser ? (
              <Link to="/create-quote">Create Quote</Link>
            ) : (
              <Link
                to={currentLocation}
                onClick={() => toast.error("Log In/Join To Access")}
              >
                Create Quote
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
