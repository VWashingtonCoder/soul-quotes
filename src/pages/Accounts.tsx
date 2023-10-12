import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Accounts() {
  const location = useLocation();
  console.log(location);

  return (
    <>
      <h1>Soul Quotes - Accounts</h1>

      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/accounts/login">Login</Link>
          </li>
          <li>
            <Link to="/accounts/join">Join</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

export default Accounts;
