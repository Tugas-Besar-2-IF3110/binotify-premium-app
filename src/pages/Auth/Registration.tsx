import React, { useState } from 'react'
import axios from 'axios'
import { debounce } from 'lodash'
import Navbar from '../../components/Navbar'
import './Registration.css'

const Registration = () => {
    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const checkValidUsername = debounce(async (username: string) => {
        setErrorUsername('');
        if (username) {
            await axios.get(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/user/check-username/${username}`).then(response => {
                if (response.data.error) {
                    setUsername('');
                    setErrorUsername(response.data.error);
                } else {
                    if (response.data.length === 0) {
                        setUsername(username);
                    } else {
                        setUsername('');
                        setErrorUsername('Username sudah digunakan');
                    }
                }
            });
        } else {
            setUsername('');
        }
    }, 1000);

    const checkValidEmail = debounce(async (email: string) => {
        setErrorEmail('');
        if (email) {
            await axios.get(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/user/check-email/${email}`).then(response => {
                if (response.data.error) {
                    setEmail('');
                    setErrorEmail(response.data.error);
                } else {
                    if (response.data.length === 0) {
                        setEmail(email);
                    } else {
                        setEmail('');
                        setErrorEmail('Email sudah digunakan');
                    }
                }
            });
        } else {
            setEmail('');
        }
    }, 1000);

    const register = (e: any) => {
        e.preventDefault();
        
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
                            {errorUsername && <p className="error register-message mt-3">{errorUsername}</p>}
                        </div>

                        <label className="label-register">Email</label>
                        <input type="text" placeholder="Email" onChange={(e) => checkValidEmail(e.target.value)} />
                        <div className="buttonOrMessageHolder">
                            {errorEmail && <p className="error register-message mt-3">{errorEmail}</p>}
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