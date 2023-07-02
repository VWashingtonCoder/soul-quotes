import './App.css'
import AccountForms from './components/AccountForms/AccountForms';
import CreateQuote from './components/CreateQuote/CreateQuote';
import Favorites from './components/Favorites/Favorites';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { useState } from 'react';


function App() {
  const [pageView, setPageView] = useState('home');
  return (
    <>
      <Header />
      {pageView === 'home' && <Home />}
      {pageView === 'favorites' && <Favorites />}
      {pageView === 'account' && <AccountForms />}
      {pageView === 'create' && <CreateQuote />}

    </>
  )
}

export default App
