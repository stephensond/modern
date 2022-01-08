import PropTypes from 'prop-types';
import React from 'react';
import httpRequest from '../../api';
import styles from './open-league.module.css'

export default function OpenLeague({info, user}) {

    const {
        team_ct, leagueid, max_teams, leaguename, ownerusername
    } = info

    const joinLeague = async () => {
        const {ok, status} = await httpRequest({
            method: 'POST',
            requestBody: JSON.stringify({user, leagueid}),
            endpoint: '/joinleague'
        });
    }

    return (
        <tr className={'leagueRow'} id={leagueid}>
            <td className={'league-name'}>{leaguename}</td>
            <td className={'capacity'}>{team_ct}/{max_teams}</td>
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
  };