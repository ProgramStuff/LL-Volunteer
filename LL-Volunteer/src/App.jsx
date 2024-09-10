import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from "./router"
import './assets/styles/index.css'


export default function App() {
    return(
        <>
            <RouterProvider router={router} />
        </>
    );
}