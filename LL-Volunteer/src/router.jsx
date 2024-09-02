import { createBrowserRouter } from "react-router-dom";
import Home from './routes/Home';
import Login from "./routes/Login";
import Board from "./routes/Board";
import Register from './routes/Register';
import PrivateRoutes from "./routes/PrivateRoutes";

export const router = createBrowserRouter([
    {path: "/", element: <Home /> },
    {path: "Home", element: <Home /> },
    {path: "Board", element: <PrivateRoutes component={Board} />},
    {path: "Register", element: <Register /> },
    {path: "Login", element: <Login /> },
  ]);
