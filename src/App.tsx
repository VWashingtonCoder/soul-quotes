import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Home from "./pages/Home.tsx";
import Accounts from "./pages/Accounts.tsx";
import Login from "./pages/Login.tsx";
import Join from "./pages/Join.tsx";
import Favorites from "./pages/Favorites.tsx";
import CreateQuote from "./pages/CreateQuote.tsx";
import { useUser } from "./context-hooks.ts";
import "./App.css";

const testUser = {
  id: 2,
  userId: "testUser",
  username: "testUser",
  email: "tu@sq.com",
  password: "Password0",
};

function App() {
  const { activeUser, logoutActiveUser } = useUser();

  return (
    <>
      <h1>Soul Quotes App</h1>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            {!activeUser ? (
              <Link to="/accounts/login">Account</Link>
            ) : (
              <Link to="/" onClick={() => logoutActiveUser()}>
                Logout
              </Link>
            )}
          </li>

          <li>
            {activeUser ? (
              <Link to="/favorites">Favorites</Link>
            ) : (
              <Link to="/" onClick={() => toast.error("Log In/Join To Access")}>
                Favorites
              </Link>
            )}
          </li>

          <li>
            {activeUser ? (
              <Link to="/create-quote">Create Quote</Link>
            ) : (
              <Link to="/" onClick={() => toast.error("Log In/Join To Access")}>
                Create Quote
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accounts" element={<Accounts />}>
          <Route path="/accounts/login" element={<Login />} />
          <Route path="/accounts/join" element={<Join />} />
        </Route>

        <Route path="/favorites" element={<Favorites />} />
        <Route path="/create-quote" element={<CreateQuote />} />
      </Routes>
    </>
  );
}

export default App;
