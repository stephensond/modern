import PropTypes from 'prop-types';
import React, { useState } from 'react';
import httpRequest from '../../api';
import styles from './open-league.module.css'

export default function OpenLeague({ info, user, handleMessage }) {

    const {
        team_ct, leagueid, max_teams, leaguename, ownerusername
    } = info
    const [teamCt, setTeamCt] = useState(team_ct)

    const joinLeague = async () => {
        const { ok, status } = await httpRequest({
            method: 'POST',
            requestBody: JSON.stringify({ user, leagueid }),
            endpoint: '/joinleague'
        });

        if (!status) {
            var message = {
                'Message': 'Unable to connect with leagues right now',
                'Sub Message': 'Go Back',
                'Link': '/'
            }
        }
        else if (!ok) {
            var message = {
                'Message': 'There was an issue joining this league',
                'Sub Message': 'Please try again or find another league',
                'Link': '/join-league'
            }
        }
        else {
            var message = {
                'Message': 'Succesfully joined league',
                'Sub Message': 'Go to league home page',
                'Link': '/' // eventually this will be the custom url for the league
            }
            setTeamCt(teamCt + 1)
        }

        handleMessage(message);
    }

    return (
        <tr className={'leagueRow'} id={leagueid}>
            <td className={'league-name'}>{leaguename}</td>
            <td className={'capacity'}>{teamCt}/{max_teams}</td>
            <td className={'owner'}>{ownerusername}</td>
            <td>
                <button
                    onClick={joinLeague}
                    className={styles.join}
                    type='button'>
                    Join League
                </button>
            </td>
        </tr>
    )
}

OpenLeague.propTypes = {
    info: PropTypes.shape({
        team_ct: PropTypes.number.isRequired,
        leagueid: PropTypes.number.isRequired,
        max_teams: PropTypes.number.isRequired,
        leaguename: PropTypes.string.isRequired,
        ownerusername: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.string.isRequired,
    handleMessage: PropTypes.func.isRequired,
};