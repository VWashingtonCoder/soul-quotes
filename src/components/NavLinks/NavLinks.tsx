import { useUserContext } from "../../hooks/CustomUseHooks";
import { User } from "../../types";

type NavProps = {
  page: string;
  changePage: React.Dispatch<React.SetStateAction<string>>;
};

const navLinks = [
  { key: "home", text: "Home" },
  { key: "account", text: "Account" },
  { key: "favorites", text: "Favorites" },
  { key: "create", text: "Create" },
];

export default function NavLinks({ page, changePage }: NavProps) {
  const { activeUser, removeActiveUser } = useUserContext();
  const { userId } = activeUser as User;

  const handlePageChange = (page: string) => {
    if (!userId && (page === "favorites" || page === "create")) {
      alert("You must be logged in to view this page.");
    } else if (userId && page === "account") {
      removeActiveUser();
      changePage("home");
    } else changePage(page);
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
