import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import Navbar from '../../components/Navbar'
import './SongManagement.css'

const SongManagement = () => {
    const [songs, setSongs] = useState([]);
    const [cookies] = useCookies();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/song`, {
            headers: {'Authorization': 'Bearer ' + cookies.binotify_premium_token}
        }).then(response => {
            setSongs(response.data);
        });
    }, []);

    return (
        <div className='page-container'>
            <Navbar />
            <div className="wrapper-detail-album">
                <div className="album-detail-block-upper">
                    <div className="album-detail-text">
                        <p className="album-detail-title">Daftar Lagu</p>
                    </div>
                </div>

                {songs.length > 0 && <div className="album-detail-block-bottomer">
                    <table className="album-detail-songs-table">
                        <tr>
                            <th className="bg-17-17-17">#</th>
                            <th className="bg-17-17-17">Judul</th>
                            <th className="album-detail-table-align-right bg-17-17-17">Audio</th>
                            <th className="album-detail-table-align-right bg-17-17-17">Edit</th>
                            <th className="album-detail-table-align-right bg-17-17-17">Delete</th>
                        </tr>

                        {songs.map((val: any, key: any) => {
                            return (
                                <tr>
                                    <td className="bg-17-17-17">{key + 1}</td>
                                    <td className="bg-17-17-17">{val.Judul}</td>
                                    <td className="album-detail-table-align-right bg-17-17-17">
                                        <audio controls src={`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/song/${val.Audio_path}`}></audio>
                                    </td>
                                    <td className="album-detail-table-align-right bg-17-17-17 album-detail-songs-buttons">
                                        <a href="<?php echo BASE_PUBLIC_URL">
                                            <button className="album-detail-songs-button">Edit</button>
                                        </a>
                                    </td>
                                    <td className="album-detail-table-align-right bg-17-17-17 album-detail-songs-buttons">
                                        <a href="<?php echo BASE_PUBLIC_URL">
                                            <button className="album-detail-songs-button">Delete</button>
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>}
            </div>
        </div>
    )
}

export default SongManagement