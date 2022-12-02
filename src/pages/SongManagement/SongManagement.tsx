import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import Navbar from '../../components/Navbar'
import './SongManagement.css'

const SongManagement = () => {
    const [songs, setSongs] = useState([]);
    const [allSongs, setAllSongs] = useState([]);
    const [cookies] = useCookies();
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const getSong = async () => {
        await axios.get(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/song`, {
            headers: {'Authorization': 'Bearer ' + cookies.binotify_premium_token}
        }).then(response => {
            setAllSongs(response.data);
            let length: any = (response.data.length - 1) / 5;
            setLastPage(parseInt(length) + 1);
            setPage(1);
            let song: any = [];
            for (let i = 0; i < min(5, response.data.length); i++) {
                song.push(response.data[i]);
            }
            setSongs(song);
        });
    }

    const deleteSong = async (id: number) => {
        await axios.delete(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/song/${id}`, {
            headers: {'Authorization': 'Bearer ' + cookies.binotify_premium_token}
        }).then(() => {
            getSong();
        })
    } 

    const firstClick = () => {
        if (page > 1) {
            setPage(1);
            const last = 1;
            let song: any = [];
            for (let i = (last - 1) * 5; i < min(allSongs.length, last * 5); i++) {
                song[song.length] = allSongs[i];
            }
            setSongs(song);
        }
      }
    
      const prevClick = () => {
        if (page > 1) {
            setPage(page - 1);
            const next = page - 1;
            let song: any = [];
            for (let i = (next - 1) * 5; i < min(allSongs.length, next * 5); i++) {
                song[song.length] = allSongs[i];
            }
            setSongs(song);
        }
      }
    
      const nextClick = () => {
        if (page < lastPage) {
            setPage(page + 1);
            const next = page + 1;
            let song: any = [];
            for (let i = (next - 1) * 5; i < min(allSongs.length, next * 5); i++) {
                song[song.length] = allSongs[i];
            }
            setSongs(song);
        }
      }
    
      const lastClick = () => {
        if (page < lastPage) {
            setPage(lastPage);
            const last = lastPage;
            let song: any = [];
            for (let i = (last - 1) * 5; i < min(allSongs.length, last * 5); i++) {
                song[song.length] = allSongs[i];
            }
            setSongs(song);
        }
      }

      const min = (a: number, b: number) => {
        if (a < b) {
          return a;
        } else {
          return b;
        }
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
                                    <td className="bg-17-17-17">{key + (page - 1) * 4 + page}</td>
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
                <div className={`text-center text-white page fixed-bottom mb-5`}>
                    <span className="mx-3" onClick={() => prevClick()}>{' < '}</span>
                    {page > 1 && <span className="mx-3" onClick={() => firstClick()}>{' 1 '}</span>}
                    {page - 2 > 1 && <span className="mx-3">{' .. '}</span>}
                    {page - 1 > 1 && <span className="mx-3" onClick={() => prevClick()}>{` ${page - 1} `}</span>}

                    <span className="mx-3 text-decoration-underline"><strong>{` ${page} `}</strong></span>

                    {page + 1 < lastPage && <span className="mx-3" onClick={() => nextClick()}>{` ${page + 1} `}</span>}
                    {page + 2 < lastPage && <span className="mx-3">{' .. '}</span>}
                    {page < lastPage && <span className="mx-3" onClick={() => lastClick()}>{` ${lastPage} `}</span>}
                    <span className="mx-3" onClick={() => nextClick()}>{' > '}</span>
                </div>
            </div>
        </div>
    )
}

export default SongManagement