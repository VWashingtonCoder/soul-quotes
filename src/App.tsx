import './App.css';
import { useState } from 'react';
import AccountForms from './components/AccountForms/AccountForms';
import CreateQuote from './components/CreateQuote/CreateQuote';
import Favorites from './components/Favorites/Favorites';
import Header from './components/Header/Header';
import Home from './components/Home/Home';

function App() {
  const [pageView, setPageView] = useState('home');
  const [activeUser, setActiveUser] = useState(null);

  return (
    <>
      <Header 
        page={pageView} 
        user={activeUser} 
        setPageView={setPageView}
      />
      {pageView === 'home' && <Home />}
      {pageView === 'favorites' && <Favorites />}
      {pageView === 'account' && <AccountForms />}
      {pageView === 'create' && <CreateQuote />}
    </>
  )
}

export default App
