import React from 'react'
import "./Navbar.css"
const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className="logo">
            <h1><b>TODO/TASK</b></h1>
        </div>
        <ul>
            <li>Home</li>
            <li>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
