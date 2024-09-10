import React from 'react'
import { useOutletContext } from "react-router-dom";


export default function Admin() {
    const context = useOutletContext()

    // if (!context.user) {
    //     return <Navigate to="/" replace />;
    // }

    return (
        <div className='home card'>
            <p>Admin Panel</p>
        </div>
  )
}