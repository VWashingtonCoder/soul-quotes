import logo from "../../assets/images/logo.png";
import HeaderLink from "./HeaderLink.tsx";

const paths = [
  { id: "home", label: "Home", pathname: "/" },
  { id: "account", label: "Account", pathname: "/accounts/login" },
  { id: "favorites", label: "Favorites", pathname: "/favorites" },
  { id: "createQuote", label: "Create Quote", pathname: "/create-quote" },
];

function Header() {
  return (
    <header className="app-header flex-between-center">
      <div className="logo-box">
        <img src={logo} alt="logo" />
      </div>

      <nav>
        <ul className="nav-links flex-between-center">
          {paths.map((path) => (
            <HeaderLink
              key={path.id}
              id={path.id}
              label={path.label}
              pathname={path.pathname}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
