import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import Navbar from '../../components/Navbar'
import './SongManagement.css'

const SongManagement = () => {
    const [songs, setSongs] = useState([]);
    const [cookies] = useCookies();

    const getSong = async () => {
        await axios.get(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/song`, {
            headers: {'Authorization': 'Bearer ' + cookies.binotify_premium_token}
        }).then(response => {
            setSongs(response.data);
        });
    }

    const deleteSong = async (id: number) => {
        await axios.delete(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/song/${id}`, {
            headers: {'Authorization': 'Bearer ' + cookies.binotify_premium_token}
        }).then(() => {
            getSong();
        })
    } 

    useEffect(() => {
        getSong();
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
                                        <Link to={`/edit-song/${val.song_id}`}>
                                            <button className="album-detail-songs-button">Edit</button>
                                        </Link>
                                    </td>
                                    <td className="album-detail-table-align-right bg-17-17-17 album-detail-songs-buttons">
                                        <button className="album-detail-songs-button" onClick={() => deleteSong(val.song_id)}>Delete</button>
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