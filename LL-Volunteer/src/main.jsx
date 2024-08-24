import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./components/SignIn.jsx"
import "./components/SignUp.jsx"
import Home from './Home.jsx'
import SignIn from './components/SignIn.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignIn />
  </StrictMode>,
)
