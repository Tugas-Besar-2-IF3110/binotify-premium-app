import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import Navbar from '../../components/Navbar'
import './SongManagement.css'

const SongManagement = () => {
    const [cookies] = useCookies();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/song`, {
            headers: {'Authorization': 'Bearer ' + cookies.binotify_premium_token}
        }).then(response => {
            console.log(response);
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

                <div className="album-detail-block-bottomer">
                    <table className="album-detail-songs-table">
                    <tr>
                        <th className="bg-17-17-17">#</th>
                        <th className="bg-17-17-17">Title</th>
                        <th className="album-detail-table-align-right bg-17-17-17">Audio</th>
                        <th className="album-detail-table-align-right bg-17-17-17">Edit</th>
                        <th className="album-detail-table-align-right bg-17-17-17">Delete</th>
                    </tr>

                    {/* <?php foreach($data["songs"] as $song): ?> */}
                        <tr>
                            <td className="bg-17-17-17">Nomor</td>
                            <td className="bg-17-17-17">Judul</td>
                            <td className="album-detail-table-align-right bg-17-17-17">Penyanyi</td>
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
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SongManagement