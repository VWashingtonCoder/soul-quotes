import { Link, useLocation } from "react-router-dom";

type NavItem = {
  path: string;
  label: string;
};

type NavbarProps = {
  navList: NavItem[];
};

function Navbar({ navList }: NavbarProps) {
  const location = useLocation().pathname;

  return (
    <nav className="navbar">
      <ul className="nav-links flex-between-center">
        {navList.map((navItemData: NavItem) => (
          <li key={navItemData.path}>
            <Link
              to={navItemData.path}
              className={`nav-link ${
                location === navItemData.path && "active"
              }`}
            >
              {navItemData.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
