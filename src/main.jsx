import React from 'react'
import App from './App'
import ReactDOM from 'react-dom/client'
import GlobalStyle from './globalStyles'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle/>
    <App />
    <ToastContainer/>
  </React.StrictMode>,
)
