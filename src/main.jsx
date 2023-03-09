import React from 'react'
import App from './App'
import ReactDOM from 'react-dom/client'
import GlobalStyle from './globalStyles'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle/>
    <App />
  </React.StrictMode>,
)
