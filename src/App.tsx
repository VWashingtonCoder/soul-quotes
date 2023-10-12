import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header.tsx";
import Home from "./pages/Home.tsx";
import Accounts from "./pages/Accounts.tsx";
import Login from "./pages/Login.tsx";
import Join from "./pages/Join.tsx";
import Favorites from "./pages/Favorites.tsx";
import CreateQuote from "./pages/CreateQuote.tsx";
import "./App.css";

function App() {
  return (
    <div id="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accounts" element={<Accounts />}>
          <Route path="/accounts/login" element={<Login />} />
          <Route path="/accounts/join" element={<Join />} />
        </Route>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/create-quote" element={<CreateQuote />} />
      </Routes>
    </div>
  );
}

export default App;
