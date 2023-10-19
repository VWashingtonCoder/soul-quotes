import { Outlet, Link } from "react-router-dom";

function Accounts() {
  return (
    <section className="page accounts">
      <header>Login To Your Account Or Join Our Wonderful Community!</header>
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
    </section>
  );
}

export default Accounts;
