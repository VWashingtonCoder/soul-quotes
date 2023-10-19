import { Outlet, Link } from "react-router-dom";

function AccountNav() {
  return (
    <section className="page account-nav">
      <nav className="nav-links flex-between-center">
        <ul>
          <li>
            <Link to="/accounts/login" className="nav-link">
              Login
            </Link>
          </li>
          <li>
            <Link to="/accounts/join" className="nav-link">
              Join
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </section>
  );
}

export default AccountNav;
