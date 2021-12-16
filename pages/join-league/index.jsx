import React, { useContext, useEffect, useState } from 'react';
import httpRequest from '../../api';
import HeaderAuthed from '../../common/header-authed';
import LinkTo from '../../common/linkto';
import { UserContext } from '../../context/useUserContext';

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
            <table className = 'Leagues'>
                <tbody>
                    <tr>
                        <th>League Name</th>
                        <th>Open Spots</th>
                    </tr>
                    {apiResponse.map((value) => (
                        <tr key={value['leagueid']}>
                            <td key='Name'>{value['leaguename']}</td>
                            <td key='Teams'>{value['team_ct']}/{value['max_teams']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </HeaderAuthed>
    )
}