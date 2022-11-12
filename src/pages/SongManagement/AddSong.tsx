import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

import Navbar from '../../components/Navbar'
import './AddSong.css'

const AddSong = () => {
    const [judul, setJudul] = useState('');
    const [audioFile, setAudioFile] = useState();
    const [successMessage, setSuccessMessage] = useState('');
    const [cookies] = useCookies();

    const addSong = async (e: any) => {
        e.preventDefault();
        await axios.post(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/song/add`, {
            Judul: judul,
            file: audioFile
        }, {
            headers: {
                'Authorization': 'Bearer ' + cookies.binotify_premium_token,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            if (!response.data.error) {
                setSuccessMessage('Tambah lagu sukses');
            }
        })
    }
    
    return (
        <div className='page-container'>
            <Navbar />
            <div className="wrapper-add-song">
                <div className="song-add-block-upper">
                    <div className="song-add-text">
                        <p className="song-add-title">Tambah Lagu</p>
                    </div>
                </div>
                <div className="song-add-block-middle">
                    <form className="add-song-form">
                        <label className="label-add-song">Judul</label>
                        <input type="text" placeholder="Judul Lagu" onChange={(e) => {
                            setJudul(e.target.value);
                            setSuccessMessage('');
                        }} />
                        
                        <label className="label-add-song">Audio File (.mp3)</label>
                        <br></br>
                        <audio controls className="song-add-audio"></audio>
                        <input type="file" placeholder="Audio File" id="song_add_audio_input" accept="audio/*" onChange={(e) => {
                            let files: any = e.target.files;
                            let audio_source: any = document.querySelector('.song-add-audio');
                            audio_source.src = URL.createObjectURL(files[0]);
                            setAudioFile(files[0]);
                            setSuccessMessage('');
                        }} />
                        
                        <div className="buttonOrMessageHolder"> 
                            {successMessage &&
                                <p className="success song-add-message mt-3">{successMessage}</p>
                            }
                        </div>

                        <div className="buttonOrMessageHolder">
                            <button className="add-song-button  mt-3" type="submit" onClick={(e) => addSong(e)}>Tambah</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddSong