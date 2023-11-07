import { Outlet } from "react-router-dom";
import { useUser } from "../../context-hooks";
import Navbar from "../shared/Navbar";
import "./Account.scss";

function AccountNav() {
  const { activeUser } = useUser();

  return (
    <section className="page account">
      {activeUser ? (
        <h2 className="loading-message">Taking You Home Now! Please wait...</h2>
      ) : (
        <>
          <Navbar
            navList={[
              { path: "/accounts/login", label: "Login" },
              { path: "/accounts/join", label: "Join" },
            ]}
          />

          <Outlet />
        </>
      )}
    </section>
  );
}

export default AccountNav;
