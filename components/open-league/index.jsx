import PropTypes from 'prop-types';
import React, { useState } from 'react';
import httpRequest from '../../api';
import styles from './open-league.module.css';

export default function OpenLeague({ info, user, handleMessage }) {
  const {
    teamct, leagueid, maxteams, leaguename, ownerusername,
  } = info;
  const [currTeamCt, setCurrTeamCt] = useState(teamct);

  const joinLeague = async () => {
    const { ok, status } = await httpRequest({
      method: 'POST',
      requestBody: JSON.stringify({ user, leagueid }),
      endpoint: '/joinleague',
    });

    if (!status) {
      const message = {
        message: 'Unable to connect with leagues right now',
        subMessage: 'Go Back',
        link: '/',
      };
      handleMessage(message);
    }
    else if (!ok) {
      const message = {
        message: 'There was an issue joining this league',
        subMessage: 'Please try again or find another league',
        link: '/join-league',
      };
      handleMessage(message);
    }
    else {
      const message = {
        message: 'Succesfully joined league',
        subMessage: 'Go to league home page',
        link: '/', // eventually this will be the custom url for the league
      };
      setCurrTeamCt(currTeamCt + 1)
      handleMessage(message);
    }

    
  }

  return (
    <tr className='leagueRow' id={leagueid}>
        <td className='league-name'>{leaguename}</td>
        <td className='capacity'>
            {currTeamCt}
            /
            {maxteams}
        </td>
        <td className='owner'>{ownerusername}</td>
        <td>
            <button
            onClick={joinLeague}
            className={styles.join}
            type='button'>
            Join League
            </button>
        </td>
    </tr>
  );
}

OpenLeague.propTypes = {
  info: PropTypes.shape({
    teamct: PropTypes.number.isRequired,
    leagueid: PropTypes.number.isRequired,
    maxteams: PropTypes.number.isRequired,
    leaguename: PropTypes.string.isRequired,
    ownerusername: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.string.isRequired,
  handleMessage: PropTypes.func.isRequired,
};
