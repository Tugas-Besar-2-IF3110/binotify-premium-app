import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import jwtDecode from 'jwt-decode'

import './Navbar.css'

const Navbar = () => {
    const [cookies, setCookies, removeCookies] = useCookies();

    const logout = () => {
        removeCookies('binotify_premium_token');
    }

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
            {getToken() === true && <Link className="nav-text" to="/">Daftar Permintaan Subscription</Link>}
            {getToken() === false && <Link className="nav-text" to="/add-song">Tambah Lagu</Link>}
            {getToken() === false && <Link className="nav-text" to="/">Daftar Lagu</Link>}
            {getToken() !== null && <a className="nav-text" onClick={() => logout()}><button type="button" className="btn-nav btn-logout">Log Out</button></a>}
        </nav>
    )
}

export default Navbar