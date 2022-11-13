import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Navbar from '../../components/Navbar'
import './EditSong.css'

const EditSong = () => {
    const [judul, setJudul] = useState('');
    const [audioFile, setAudioFile] = useState();
    const [successMessage, setSuccessMessage] = useState('');
    const [cookies] = useCookies();
    const { id } = useParams();
    const history = useHistory();

    const editSong = async (e: any) => {
        e.preventDefault();
        if (!audioFile) {
            axios.put(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/song/title/${id}`, {
                Judul: judul
            }, {
                headers: {
                    'Authorization': 'Bearer ' + cookies.binotify_premium_token
                }
            }).then(() => {
                history.push('/');
            });
        } else {
            axios.put(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/song/all/${id}`, {
                Judul: judul,
                file: audioFile
            }, {
                headers: {
                    'Authorization': 'Bearer ' + cookies.binotify_premium_token,
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                history.push('/');
            });
        }
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/song/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + cookies.binotify_premium_token
            }
        }).then(response => {
            let audio_source: any = document.querySelector('.song-edit-audio');
            setJudul(response.data.Judul);
            audio_source.src = `${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/song/${response.data.Audio_path}`
        });
    }, []);
    
    return (
        <div className='page-container'>
            <Navbar />
            <div className="wrapper-edit-song">
                <div className="song-edit-block-upper">
                    <div className="song-edit-text">
                        <p className="song-edit-title">Edit Lagu</p>
                    </div>
                </div>
                <div className="song-edit-block-middle">
                    <form className="edit-song-form">
                        <label className="label-edit-song">Judul</label>
                        <input type="text" placeholder="Judul Lagu" value={judul} onChange={(e) => {
                            setJudul(e.target.value);
                            setSuccessMessage('');
                        }} />
                        
                        <label className="label-edit-song">Audio File (.mp3)</label>
                        <br></br>
                        <audio controls className="song-edit-audio"></audio>
                        <input type="file" placeholder="Audio File" id="song_add_audio_input" accept="audio/*" onChange={(e) => {
                            let files: any = e.target.files;
                            let audio_source: any = document.querySelector('.song-edit-audio');
                            audio_source.src = URL.createObjectURL(files[0]);
                            setAudioFile(files[0]);
                            setSuccessMessage('');
                        }} />
                        
                        <div className="buttonOrMessageHolder"> 
                            {successMessage &&
                                <p className="success song-edit-message mt-3">{successMessage}</p>
                            }
                        </div>

                        <div className="buttonOrMessageHolder">
                            <button className="edit-song-button  mt-3" type="submit" onClick={(e) => editSong(e)}>Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditSong