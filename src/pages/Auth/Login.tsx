import React from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../../components/Navbar'
import './Login.css'

const Login = () => {
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
                        <input type="text" placeholder="Username" name="username" />

                        <label className="label-login">Password</label>
                        <input type="password" placeholder="Password" name="password" />
                        
                        <div className="buttonOrMessageHolder">
                            {true &&
                                <p className="error login-message mt-3">Tes</p>
                            }
                        </div>
                        
                        <div className="buttonOrMessageHolder">
                            <button className="login-button" type="submit">Login</button>
                        </div>
                        <p className="label-login"><span>Not registered ? </span><Link id="reg-link" to="/register">Register here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login