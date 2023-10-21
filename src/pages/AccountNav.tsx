import { Outlet, Link } from "react-router-dom";
import { useUser } from "../context-hooks";

function AccountNav() {
  const { activeUser } = useUser();
  return (
    <section className="page account-nav">
      {activeUser ? (
        <h2 className="loading-message">Taking You Home Now! Please wait...</h2>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
}

export default AccountNav;
