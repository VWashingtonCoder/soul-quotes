import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QuoteProvider } from './providers/QuoteProvider.tsx'
import { UserProvider } from './providers/UsersProvider.tsx'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <QuoteProvider>
        <App />
      </QuoteProvider>
    </UserProvider>
  </React.StrictMode>,
)
