import React, { useContext, useEffect, useState } from 'react';
import httpRequest from '../../api';
import HeaderAuthed from '../../common/header-authed';
import { UserContext } from '../../context/useUserContext';
import OpenLeague from '../../components/open-league';
import styles from './joinleague.module.css'

export default function joinLeague() {
    const {user} = useContext(UserContext);
    const [apiResponse, setapiResponse] = useState([]);
    const [error, setError] = useState('');

    const grabLeagues = async () => {

        console.log('hi')
        const {ok, responseBody} = await httpRequest({
            method: 'GET',
            endpoint: '/grableagues'
        })

        if (!ok) {
            setError('Could not load leagues')
            return
        }
        
        setapiResponse(responseBody)
        return
    }
    

    useEffect(() => {
        grabLeagues()
      }, []);

    return(
        <HeaderAuthed>
            <div className={styles.container}>
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
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            
        </HeaderAuthed>
    )
}