import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header.tsx";
import Home from "./pages/Home.tsx";
import AccountNav from "./pages/AccountNav.tsx";
import LoginForm from "./forms/LoginForm.tsx";
import JoinForm from "./forms/JoinForm.tsx";
import Favorites from "./pages/Favorites.tsx";
import CreateQuote from "./pages/CreateQuote.tsx";
import "./App.css";

function App() {
  return (
    <div id="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accounts" element={<AccountNav />}>
          <Route path="/accounts/login" element={<LoginForm />} />
          <Route path="/accounts/join" element={<JoinForm />} />
        </Route>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/create-quote" element={<CreateQuote />} />
      </Routes>
    </div>
  );
}

export default App;
