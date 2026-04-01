import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./AuthContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>   {/* ✅ Router here */}
    <AuthProvider>  {/* ✅ Auth here */}
      <App />
    </AuthProvider>
  </BrowserRouter>
)