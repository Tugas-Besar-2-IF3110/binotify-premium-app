import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import Navbar from '../../components/Navbar'
import './SubscriptionList.css'

const SubscriptionList = () => {
    const [subscriptionList, setSubscriptionList] = useState([]);
    const [allSubscriptionList, setAllSubscriptionList] = useState([]);
    const [cookies] = useCookies();
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const ApproveOrRejectSubscription = async (creatorId: number, subscriberId: number, approve: boolean) => {
        await axios.post(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/subscription/accept_or_reject`, {
            creatorId: creatorId,
            subscriberId: subscriberId,
            approve: approve
        }, {
            headers: {'Authorization': 'Bearer ' + cookies.binotify_premium_token}
        }).then(response => {
            getSubscriptionList();
        });
    } 

    const getSubscriptionList = async () => {
        await axios.get(`${import.meta.env.VITE_BINOTIFY_PREMIUM_API}/subscription`, {
            headers: {'Authorization': 'Bearer ' + cookies.binotify_premium_token}
        }).then(response => {
            let subscription_data = response.data["S:Envelope"]["S:Body"]["ns2:listRequestSubscriptionResponse"]["return"]["list"];
            if ("elements" in subscription_data) {
                if (!subscription_data["elements"].length) {
                    subscription_data["elements"] = [subscription_data["elements"]];
                }
                setAllSubscriptionList(subscription_data["elements"]);
            } else {
                subscription_data["elements"] = [];
                setAllSubscriptionList([]);
            }
            let length: any = (subscription_data["elements"].length - 1) / 5
            setLastPage(parseInt(length) + 1)
            let subscription: any = [];
            for (let i = 0; i < min(5, subscription_data["elements"].length); i++) {
                subscription.push(subscription_data["elements"][i]);
            }
            setSubscriptionList(subscription);
        });
    }

    const firstClick = () => {
        if (page > 1) {
            setPage(1);
            const last = 1;
            let subscription: any = [];
            for (let i = (last - 1) * 5; i < min(allSubscriptionList.length, last * 5); i++) {
                subscription[subscription.length] = allSubscriptionList[i];
            }
            setSubscriptionList(subscription);
        }
      }
    
      const prevClick = () => {
        if (page > 1) {
            setPage(page - 1);
            const next = page - 1;
            let subscription: any = [];
            for (let i = (next - 1) * 5; i < min(allSubscriptionList.length, next * 5); i++) {
                subscription[subscription.length] = allSubscriptionList[i];
            }
            setSubscriptionList(subscription);
        }
      }
    
      const nextClick = () => {
        if (page < lastPage) {
            setPage(page + 1);
            const next = page + 1;
            let subscription: any = [];
            for (let i = (next - 1) * 5; i < min(allSubscriptionList.length, next * 5); i++) {
                subscription[subscription.length] = allSubscriptionList[i];
            }
            setSubscriptionList(subscription);
        }
      }
    
      const lastClick = () => {
        if (page < lastPage) {
            setPage(lastPage);
            const last = lastPage;
            let subscription: any = [];
            for (let i = (last - 1) * 5; i < min(allSubscriptionList.length, last * 5); i++) {
                subscription[subscription.length] = allSubscriptionList[i];
            }
            setSubscriptionList(subscription);
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
        getSubscriptionList();
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
                                        <button className="subscription-list-songs-button" onClick={() => ApproveOrRejectSubscription(val.creatorId._text, val.subscriberId._text, true)}>Accept</button>
                                    </td>
                                    <td className="subscription-list-table-align-right bg-17-17-17 subscription-list-songs-buttons">
                                        <button className="subscription-list-songs-button" onClick={() => ApproveOrRejectSubscription(val.creatorId._text, val.subscriberId._text, false)}>Reject</button>
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

export default SubscriptionList