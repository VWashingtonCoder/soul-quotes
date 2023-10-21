import { Outlet, Link, useLocation } from "react-router-dom";
import { useUser } from "../context-hooks";
import "../styles/Account.scss";

function AccountNav() {
  const { activeUser } = useUser();
  const location = useLocation().pathname;
  return (
    <section className="page account">
      {activeUser ? (
        <h2 className="loading-message">Taking You Home Now! Please wait...</h2>
      ) : (
        <>
          <nav className="account-nav">
            <ul className="nav-links flex-between-center">
              <li>
                <Link to="/accounts/login" className={`nav-link ${location === "/accounts/login" && "active"}`}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/accounts/join" className={`nav-link ${location === "/accounts/join" && "active"}`}>
                  Join
                </Link>
              </li>
            </ul>
          </nav>

          <Outlet />
        </>
      )}
    </section>
  );
}

export default AccountNav;
