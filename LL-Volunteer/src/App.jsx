import { useState, React } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import './App.css'
import Home from './components/pages/Home'
import Login from "./components/pages/Login"
import Board from "./components/pages/Board"
import Register from './components/pages/Register'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Board" element={<Board />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}


function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function NoPage() {
  return <h2>404 Page Not Found</h2>;
}