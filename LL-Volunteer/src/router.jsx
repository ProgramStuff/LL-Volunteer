import { createBrowserRouter } from "react-router-dom";
import Home from './components/routes/Home';
import Login from "./components/routes/Login";
import Board from "./components/routes/Board";
import Register from './components/routes/Register';

export const router = createBrowserRouter([
    {path: "/", element: <Home /> },
    {path: "/Home", element: <Home /> },
    {path: "Board", element: <Board /> },
    {path: "Register", element: <Register /> },
    {path: "Login", element: <Login /> },
  ]);
  