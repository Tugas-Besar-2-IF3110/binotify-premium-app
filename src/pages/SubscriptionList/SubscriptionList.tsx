import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import Navbar from '../../components/Navbar'
import './SubscriptionList.css'

const SubscriptionList = () => {
    const [subscriptionList, setSubscriptionList] = useState([]);
    const [cookies] = useCookies();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/subscription`, {
            headers: {'Authorization': 'Bearer ' + cookies.binotify_premium_token}
        }).then(response => {
            setSubscriptionList(response.data["S:Envelope"]["S:Body"]["ns2:listRequestSubscriptionResponse"]["return"]["list"])
            console.log(response.data)
        });
    }, []);

    return (
        <div className='page-container'>
            <Navbar />
            <div className="wrapper-list-subscription">
                <div className="subscription-list-block-upper">
                    <div className="subscription-list-text">
                        <p className="subscription-list-title">Daftar Permintaan Subscription</p>
                    </div>
                </div>

                {subscriptionList.length > 0 && <div className="subscription-list-block-bottomer">
                    <table className="subscription-list-songs-table">
                        <tr>
                            <th className="bg-17-17-17">#</th>
                            <th className="bg-17-17-17">Subscriber ID</th>
                            <th className="subscription-list-table-align-left bg-17-17-17">Creator ID</th>
                            <th className="subscription-list-table-align-right bg-17-17-17">Accept</th>
                            <th className="subscription-list-table-align-right bg-17-17-17">Reject</th>
                        </tr>

                        {subscriptionList.map((val: any, key: any) => {
                            return (
                                <tr>
                                    <td className="bg-17-17-17">{key + 1}</td>
                                    <td className="bg-17-17-17">{val.subscriberId._text}</td>
                                    <td className="subscription-list-table-align-left bg-17-17-17">{val.creatorId._text}</td>
                                    <td className="subscription-list-table-align-right bg-17-17-17 subscription-list-songs-buttons">
                                        <button className="subscription-list-songs-button">Accept</button>
                                    </td>
                                    <td className="subscription-list-table-align-right bg-17-17-17 subscription-list-songs-buttons">
                                        <button className="subscription-list-songs-button">Reject</button>
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

export default SubscriptionList