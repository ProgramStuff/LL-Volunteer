import React from 'react'
import { useOutletContext, Link } from 'react-router-dom'

export default function Profile() {

    const context = useOutletContext();

    // if (!context.user) {
    //     return <Navigate to="/" replace />;
    // }

    return (
        <div className='home card'>
            <h1>Welcome {context.user.username}</h1>
            <p><Link to="/Board">Message Board</Link></p>
        </div>
  )
}
