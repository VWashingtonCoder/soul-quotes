import "./App.css";
import { useState } from "react";
import JoinForm from "./components/JoinForm/JoinForm";
import LoginForm from "./components/LoginForm/LoginForm";
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
      {pageView === "account" && (
        <section className="page accounts flex-align-center">
          <JoinForm />
          {/* <LoginForm /> */}
        </section>
      )
      }
      {pageView === "favorites" && <Favorites />}
      {pageView === "create" && <CreateQuote />}
    </>
  );
}

export default App;
