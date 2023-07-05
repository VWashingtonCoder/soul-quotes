import "./App.css";
import { useState } from "react";
import { User } from "./types";
import AccountForms from "./components/AccountForms/AccountForms";
import CreateQuote from "./components/CreateQuote/CreateQuote";
import Favorites from "./components/Favorites/Favorites";
import NavLinks from "./components/NavLinks/NavLinks";
import Home from "./components/Home/Home";

const testUser = {
  id: 0,
  userId: "testUser",
  username: "testUser",
  email: "testuser@ex.com",
  password: "testPassword",
};

function App() {
  const [pageView, setPageView] = useState("home");
  const [activeUser, setActiveUser] = useState(testUser);

  const removeActiveUser = () => {
    const noUser = {
      id: 0,
      userId: "",
      username: "",
      email: "",
      password: "",
    };
    setActiveUser(noUser);
    setPageView("home");
  };

  return (
    <>
      <header className="app-header">
        <NavLinks
          page={pageView}
          user={activeUser}
          setPageView={setPageView}
          removeUser={removeActiveUser}
        />
      </header>

      {pageView === "home" && <Home />}
      {pageView === "favorites" && <Favorites />}
      {pageView === "account" && <AccountForms />}
      {pageView === "create" && <CreateQuote />}
    </>
  );
}

export default App;
