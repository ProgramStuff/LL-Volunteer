import { createBrowserRouter } from "react-router-dom";
import Home from './routes/Home';
import Login from "./routes/Login";
import Board from "./routes/Board";
import Register from './routes/Register';
import Profile from "./routes/Profile";
import Admin from './routes/Admin';
import Layout from "./components/Layout";
import PrivateRoutes from "./routes/PrivateRoutes";
import UserBoard from "./routes/UserBoard";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "Home", element: <Home /> },
        { path: "Register", element: <Register /> },
        { path: "Login", element: <Login /> },
        { 
          element: <PrivateRoutes role="user" />,
          children: [
            { path: "/profile", element: <Profile /> },
            { path: "/userBoard", element: <UserBoard /> },
          ]
        },
        { 
          element: <PrivateRoutes role="admin" />,
          children: [
            { path: "admin", element: <Admin /> },
            { path: "board", element: <Board /> }
          ]
        },
        { 
          path: "*",
          element: <p>404 Error - Nothing here</p>
        }
      ]
    }
  ]
);
