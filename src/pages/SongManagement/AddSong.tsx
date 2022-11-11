import React, { useState } from 'react'

import Navbar from '../../components/Navbar'
import './AddSong.css'

const AddSong = () => {
    const [judul, setJudul] = useState('');
    const [audioFile, setAudioFile] = useState();
    
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
                        <input type="text" placeholder="Judul Lagu" />
                        
                        <label className="label-add-song">Audio File (.mp3)</label>
                        <br></br>
                        <audio controls className="song-add-audio"></audio>
                        <input type="file" placeholder="Audio File" id="song_add_audio_input" accept="audio/*" onChange={(e) => {
                            let files: any = e.target.files;
                            let audio_source: any = document.querySelector('.song-add-audio');
                            let song_add_audio: any = document.querySelector('.song-add-audio_input');
                            audio_source.src = URL.createObjectURL(files[0]);
                            song_add_audio.load();
                            setAudioFile(files[0]);
                        }} />
                        
                        <div className="buttonOrMessageHolder">
                            {true &&
                                <p className="error song-add-message mt-3">Error</p>
                            }
                                
                            {true &&
                                <p className="success song-add-message mt-3">Sukses</p>
                            }
                        </div>

                        <div className="buttonOrMessageHolder">
                            <button className="add-song-button" type="submit">Tambah</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddSong