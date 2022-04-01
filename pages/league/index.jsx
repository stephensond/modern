import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import httpRequest from '../../api';
import HeaderAuthed from '../../common/header-authed';
import styles from './league.module.css';

function TeamRow({ team, buttonHandler }) {
  if (team) {
    return (
      <tr className={styles.filled}>
        <td>{team.teamid}</td>
        <td>{team.ownerusername}</td>
      </tr>
    );
  }
  return (
    <tr>
      <td className={styles.empty}>Empty</td>
      <td className={styles.empty}>Empty</td>
      <button
        onClick={buttonHandler}
        className={styles.enter}
        type="button"
      >
        Invite!
      </button>
    </tr>
  );
}

TeamRow.propTypes = {
  team: PropTypes.shape({
    teamid: PropTypes.number.isRequired,
    ownerusername: PropTypes.string.isRequired,
  }).isRequired,
  buttonHandler: PropTypes.func.isRequired,
};

export default function League() {
  const router = useRouter();
  const [teams, setTeams] = useState(null);
  const [error, setError] = useState('');
  const [leagueSize, setLeagueSize] = useState(0);
  const [apiResponse, setApiResponse] = useState(null);

  const { id } = router.query;

  const enterDraftRoom = () => {
    setError('Not implemeted yet!!');
  };

  const Title = () => `League ${id} Home Page`;

  const inviteToLeague = () => {
    setError('Not implemeted yet!!');
  };

  useEffect(() => {
    const getTeams = async () => {
      if (!router.isReady || !router.query) {
        setError('');
        return;
      }

      if (!id) {
        setError('League does not exist');
        return;
      }

      const { ok, responseBody } = await httpRequest({
        method: 'GET',
        endpoint: `/grabteams?id=${id}`,
      });

      if (!ok || !responseBody.length) {
        setError('League does not exist');
        return;
      }

      setLeagueSize({
        max: responseBody[0].numteams,
        current: responseBody.length
      });
  
      for (let i = 0; i < (responseBody[0].numteams - responseBody.length); i + 1) {
        responseBody.push(null);
      }

      setTeams(responseBody);
    };

    getTeams();
  }, [router, id]);

  return (
    <HeaderAuthed>
      <h1 className={styles.title}>
        {Title(id)}
      </h1>
      <div className={styles.tableIntro}>
        Teams (
        {leagueSize.current}
        /
        {leagueSize.max}
        ):
      </div>
      {teams
      && (
      <table className={styles.teamTable}>
        <tr>
          <th>TeamID</th>
          <th>Team Owner</th>
          <th>Invite</th>
        </tr>
          {teams.map((team) => (
            <TeamRow
              team={team}
              buttonHandler={inviteToLeague}
            />
          ))}
      </table>
      )}
      <div>
        <button
          onClick={enterDraftRoom}
          className={styles.enter}
          type="button"
        >
          Enter Draft
        </button>
      </div>
      {error && error}
    </HeaderAuthed>
  );
}

League.propTypes = {
  team: PropTypes.shape({
    teamid: PropTypes.number.isRequired,
    ownerusername: PropTypes.string.isRequired,
  }).isRequired,
};
