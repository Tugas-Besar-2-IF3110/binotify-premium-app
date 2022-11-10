import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { debounce } from 'lodash'

import Navbar from '../../components/Navbar'
import './Registration.css'

const Registration = () => {
    const [nama, setNama] = useState(String);
    const [username, setUsername] = useState(String);
    const [errorUsername, setErrorUsername] = useState(String);
    const [email, setEmail] = useState(String);
    const [errorEmail, setErrorEmail] = useState(String);
    const [password, setPassword] = useState(String);
    const [confirmPassword, setConfirmPassword] = useState(String);
    const [errorRegister, setErrorRegister] = useState(String);
    const [cookies, setCookies] = useCookies();

    const checkValidUsername = debounce(async (username: string) => {
        setErrorUsername('');
        if (username) {
            await axios.get(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/user/check-username/${username}`).then(response => {
                if (response.data.error) {
                    setUsername('');
                    setErrorUsername(response.data.error);
                } else {
                    if (!response.data) {
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
                    if (!response.data) {
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
        if (!errorUsername && !errorEmail) {
            if (!nama) {
                setErrorRegister('Nama is required');
            } else if (!username) {
                setErrorRegister('Username is required');
            } else if (!email) {
                setErrorRegister('Email is required');
            } else if (!password) {
                setErrorRegister('Password is required');
            } else if (password !== confirmPassword) {
                setErrorRegister('Password yang dimasukkan tidak sama');
            } else {
                axios.post(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/user/register`, {
                    email: email,
                    password: password,
                    username: username,
                    name: nama
                }).then(response => {
                    setCookies('binotify_premium_token', response.data.token);
                });
            }
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
                            {errorUsername && <p className="error register-message mt-3">{errorUsername}</p>}
                        </div>

                        <label className="label-register">Email</label>
                        <input type="text" placeholder="Email" onChange={(e) => checkValidEmail(e.target.value)} />
                        <div className="buttonOrMessageHolder">
                            {errorEmail && <p className="error register-message mt-3">{errorEmail}</p>}
                        </div>

                        <label className="label-register">Password</label>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                        <label className="label-register">Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />

                        <div className="buttonOrMessageHolder">
                            {errorRegister &&<p className="error register-message mt-3">{errorRegister}</p>}
                        </div>

                        <div className="buttonOrMessageHolder">
                            <button className="register-button mt-3" type="submit" onClick={(e) => register(e)}>Register</button>
                        </div>
                        <p className="label-register"><span>Already have an account ? </span><Link id="log-link" to="/login">Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registration