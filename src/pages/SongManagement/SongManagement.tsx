import React from 'react'

import Navbar from '../../components/Navbar'
import './SongManagement.css'

const SongManagement = () => {
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
                        <th className="album-detail-table-align-right bg-17-17-17">Singer</th>
                        <th className="album-detail-table-align-right bg-17-17-17">Duration</th>
                        <th className="album-detail-table-align-right bg-17-17-17">Detail</th>
                    </tr>

                    {/* <?php foreach($data["songs"] as $song): ?> */}
                        <tr>
                            <td className="bg-17-17-17">Nomor</td>
                            <td className="bg-17-17-17">Judul</td>
                            <td className="album-detail-table-align-right bg-17-17-17">Penyanyi</td>
                            <td className="album-detail-table-align-right bg-17-17-17">Durasi</td>
                            <td className="album-detail-table-align-right bg-17-17-17 album-detail-songs-buttons">
                                <a href="<?php echo BASE_PUBLIC_URL">
                                    <button className="album-detail-songs-button">Detail</button>
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