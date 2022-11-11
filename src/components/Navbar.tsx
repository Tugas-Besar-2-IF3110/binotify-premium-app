import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import jwtDecode from 'jwt-decode'

import './Navbar.css'

const Navbar = () => {
    const [cookies] = useCookies();

    const getToken = () => {
        if (cookies.binotify_premium_token) {
            let decodedToken: any;
            decodedToken = jwtDecode(cookies.binotify_premium_token);
            return decodedToken.isAdmin;
        }
        return null;
    }

    return (
        <nav className="navbar-container">
            <div className="profile">
                <img src="https://www.pngitem.com/pimgs/m/108-1084833_spotify-icon-spotify-icon-white-png-transparent-png.png" className="navbar-image" />
            </div>
            {getToken() === true && <Link className="nav-text" to="add-premium-song">Daftar Permintaan Subscription</Link>}
            {getToken() === false && <Link className="nav-text" to="add-premium-song">Tambah Lagu</Link>}
            {getToken() === false && <Link className="nav-text" to="add-premium-song">Daftar Lagu</Link>}
        </nav>
    )
}

export default Navbar