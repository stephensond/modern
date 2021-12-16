import React, { useCallback, useContext, useEffect, useState } from 'react';
import httpRequest from '../../api';
import HeaderAuthed from '../../common/header-authed';
import LinkTo from '../../common/linkto';
import { UserContext } from '../../context/useUserContext';

export default function joinLeague() {
    const {user} = UseContext(UserContext);
    const [apiResponse, setapiResponse] = UseState([]);
    const [error, setError] = useState('');

    const grabLeagues = (async (e) => {

        const {ok, responseBody} = await httpRequest({
            method: 'GET',
            requestBody: {},
            endpoint: 'openleagues'
        })

        if (!ok) {
            setError('Could not load leagues')
            return
        }
        
        setapiResponse(responseBody)
        return
    }
    )

    useEffect(() => {
        grabLeagues
      }, []);

    return(
        <HeaderAuthed>
            <table className = 'Leagues'>
                <tbody>
                    <tr>
                        <th>LeagueName</th>
                        <th>OpenSpots</th>
                    </tr>
                    {apiResponse.map((value) => (
                        <tr>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </HeaderAuthed>
    )




}