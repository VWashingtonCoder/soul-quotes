import { User } from "../../types";

type NavProps = {
  page: string;
  user: User;
  setPageView: (page: string) => void;
  removeUser: () => void;
};

const navLinks = [
  { key: "home", text: "Home" },
  { key: "account", text: "Account" },
  { key: "favorites", text: "Favorites" },
  { key: "create", text: "Create" },
];

export default function NavLinks(props: NavProps) {
  const { page, user, setPageView, removeUser } = props;
  const { userId } = user;

  const handlePageChange = (page: string) => {
    if (!userId && (page === "favorites" || page === "create")) {
      alert("You must be logged in to view this page.");
    } else if (userId && page === "account") {
      removeUser();
    } else setPageView(page);
  };

  return (
    <nav className="nav-links">
      {navLinks.map((link) => {
        const { key } = link;
        const btnText = key === "account" && userId ? "Logout" : link.text;

        return (
          <button
            key={key}
            className={`nav-btn ${page === key ? "active" : ""}`}
            onClick={() => handlePageChange(key)}
          >
            {btnText}
          </button>
        );
      })}
    </nav>
  );
}
