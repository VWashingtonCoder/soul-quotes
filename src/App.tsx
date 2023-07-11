import "./App.css";
import { useState } from "react";
import AccountForms from "./components/AccountForms/AccountForms";
import CreateQuote from "./components/CreateQuote/CreateQuote";
import Favorites from "./components/Favorites/Favorites";
import NavLinks from "./components/NavLinks/NavLinks";
import Home from "./components/Home/Home";

function App() {
  const [pageView, setPageView] = useState("home");

  return (
    <>
      <header className="app-header">
        <NavLinks page={pageView} changePage={setPageView} />
      </header>

      {pageView === "home" && <Home />}
      {pageView === "account" && <AccountForms />}
      {pageView === "favorites" && <Favorites />}
      {pageView === "create" && <CreateQuote />}
    </>
  );
}

export default App;
