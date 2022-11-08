import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar-container">
            <div className="profile">
                <img src="https://www.pngitem.com/pimgs/m/108-1084833_spotify-icon-spotify-icon-white-png-transparent-png.png" className="navbar-image" />
            </div>
            {/* <a className="nav-text" href="">Home</a> */}
        </nav>
    )
}

export default Navbar