import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Home from "./components/Home/Home.tsx";
import AccountNav from "./components/Account/AccountNav.tsx";
import LoginForm from "./components/Account/LoginForm.tsx";
import JoinForm from "./components/Account/JoinForm.tsx";
import Favorites from "./components/Favorites/Favorites.tsx";
import CreateQuote from "./components/Create/CreateQuote.tsx";
import CreateForm from "./components/Create/CreateForm.tsx";
import CreateList from "./components/Create/CreateList.tsx";
import "./App.scss";

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
        <Route path="/create-quote" element={<CreateQuote />}>
          <Route path="/create-quote/form" element={<CreateForm />} />
          <Route path="/create-quote/list" element={<CreateList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
