import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import './Registration.css'

const Registration = () => {
    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const register = (e: any) => {
        e.preventDefault();
        
    }

    const checkValidUsername = async (username: string) => {
        if (username) {
            await axios.get(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/user/check-username/${username}`).then(response => {
                if (response.data.length === 0) {
                    setUsername(username);
                } else {
                    setUsername('');
                    setErrorUsername('Username sudah digunakan');
                }
            });
        }
    }

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
                        <input type="text" placeholder="Nama" onChange={(e) => setNama(e.target.value)} />

                        <label className="label-register">Username</label>
                        <input type="text" placeholder="Username" onChange={(e) => checkValidUsername(e.target.value)} />
                        <div className="buttonOrMessageHolder">
                            {errorUsername && <p className="error register-message mt-3" id="error-username">{errorUsername}</p>}
                        </div>

                        <label className="label-register">Email</label>
                        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <div className="buttonOrMessageHolder">
                            <p className="error register-message mt-3" id="error-email" hidden></p>
                        </div>

                        <label className="label-register">Password</label>
                        <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                        <label className="label-register">Confirm Password</label>
                        <input type="text" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />

                        <div className="buttonOrMessageHolder">
                            {true &&
                                <p className="error register-message mt-3">Tes</p>
                            }
                        </div>

                        <div className="buttonOrMessageHolder">
                            <button className="register-button" type="submit" onClick={(e) => register(e)}>Register</button>
                        </div>
                        <p className="label-register"><span>Already have an account ? </span><a id="log-link" href="login">Login</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registration