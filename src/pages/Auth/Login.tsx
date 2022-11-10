import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import Navbar from '../../components/Navbar'
import './Login.css'

const Login = () => {
    const [username, setUsername] = useState(String);
    const [password, setPassword] = useState(String);
    const [errorLogin, setErrorLogin] = useState(String);
    const [cookies, setCookies] = useCookies();

    const login = (e: any) => {
        e.preventDefault();
        if (!username) {
            setErrorLogin('Username is required');
        } else if (!password) {
            setErrorLogin('Password is required');
        } else {
            axios.post(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/user/login`, {
                username: username,
                password: password
            }).then(response => {
                if (response.data.error) {
                    setErrorLogin(response.data.error);
                } else {
                    setCookies('binotify_premium_token', response.data.token);
                }
            });
        }
    }

    return (
        <div className='page-container'>
            <Navbar />
            <div className="wrapper-login">
                <div className="login-block-upper">
                    <div className="login-text">
                        <p className="login-title">Login</p>
                    </div>
                </div>
                <div className="login-block-middle">
                    <form className="login-form" action="<?= BASE_PUBLIC_URL; ?>/auth/login" method="post">
                        <label className="label-login">Username</label>
                        <input type="text" placeholder="Username" onChange={(e) => {
                            setUsername(e.target.value);
                            setErrorLogin('');
                        }} />

                        <label className="label-login">Password</label>
                        <input type="password" placeholder="Password" onChange={(e) => {
                            setPassword(e.target.value);
                            setErrorLogin('');
                        }} />
                        
                        <div className="buttonOrMessageHolder">
                            {errorLogin && <p className="error login-message mt-3">{errorLogin}</p>}
                        </div>
                        
                        <div className="buttonOrMessageHolder">
                            <button className="login-button mt-3" type="submit" onClick={(e) => login(e)}>Login</button>
                        </div>
                        <p className="label-login"><span>Not registered ? </span><Link id="reg-link" to="/register">Register here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login