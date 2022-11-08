import React from 'react'
import Navbar from '../../components/Navbar'
import './Registration.css'

const Registration = () => {
    return (
        <div className='page-container'>
            <Navbar />
            <div className="wrapper-register">
                <div className="register-block-upper">
                    <div className="register-text">
                        <p className="register-title">Register</p>
                    </div>
                </div>
                <div className="register-block-middle">
                    <form className="register-form" action="<?= BASE_PUBLIC_URL; ?>/auth/register" method="post" id="registration">
                        <label className="label-register">Nama</label>
                        <input type="text" placeholder="Nama" name="nama" />

                        <label className="label-register">Username</label>
                        <input type="text" placeholder="Username" name="username" id="register-username" />
                        <div className="buttonOrMessageHolder">
                            <p className="error register-message" id="error-username" hidden></p>
                        </div>

                        <label className="label-register">Email</label>
                        <input type="text" placeholder="Email" name="email" id="register-email" />
                        <div className="buttonOrMessageHolder">
                            <p className="error register-message" id="error-email" hidden></p>
                        </div>

                        <label className="label-register">Password</label>
                        <input type="text" placeholder="Password" name="password" />

                        <label className="label-register">Confirm Password</label>
                        <input type="text" placeholder="Confirm Password" name="confirm-password" />

                        <div className="buttonOrMessageHolder">
                            {true &&
                                <p className="error register-message mt-3">Tes</p>
                            }
                        </div>

                        <div className="buttonOrMessageHolder">
                            <button className="register-button" type="submit">Register</button>
                        </div>
                        <p className="label-register"><span>Already have an account ? </span><a id="log-link" href="login">Login</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registration