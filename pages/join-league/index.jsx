import React, { useContext, useEffect, useState } from 'react';
import httpRequest from '../../api';
import HeaderAuthed from '../../common/header-authed';
import { UserContext } from '../../context/useUserContext';
import OpenLeague from '../../components/open-league';
import styles from './joinleague.module.css'
import PopupWindow from '../../components/popup-window';
import LinkTo from '../../common/linkto';

export default function joinLeague() {
    const { user } = useContext(UserContext);
    const [apiResponse, setapiResponse] = useState([]);
    const [popupMessage, setPopupMessage] = useState({ 'Sub Message': '', 'Link': '/' })
    const [popupVisible, setPopupVisible] = useState(false)

    const handleMessage = (mess) => {
        setPopupMessage(mess);
        setPopupVisible(true);
    }

    const grabLeagues = async () => {

        console.log('hi')
        const { ok, responseBody } = await httpRequest({
            method: 'GET',
            endpoint: '/grableagues'
        })

        if (!ok) {
            let message = {
                'Message': 'Unable to connect with leagues right now',
                'Sub Message': 'Go Back',
                'Link': '/'
            }
            handleMessage(message)
            return
        }

        setapiResponse(responseBody)
        return
    }

    const handleClose = (e) => {
        setPopupVisible(e);
    }

    useEffect(() => {
        grabLeagues()
    }, []);

    return (
        <HeaderAuthed>
            <div className={styles.container}>
                <PopupWindow
                    title={''}
                    show={popupVisible}
                    onClose={handleClose}
                >
                    <h2>{popupMessage['Message']}</h2>
                    <h3>
                        <LinkTo href={popupMessage['Link']}>
                            {popupMessage['Sub Message']}
                        </LinkTo>
                    </h3>
                </PopupWindow>
                <table className={styles.leaguesTable}>
                    <tbody>
                        <tr>
                            <th>League Name</th>
                            <th>Capacity</th>
                            <th>Owner</th>
                            <th>Join</th>
                        </tr>
                        {apiResponse.map((value) => (
                            <OpenLeague
                                key={value.leagueid}
                                info={value}
                                user={user}
                                handleMessage={handleMessage}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

        </HeaderAuthed>
    )
}