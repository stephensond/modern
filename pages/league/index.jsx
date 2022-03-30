import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import httpRequest from '../../api';
import HeaderAuthed from '../../common/header-authed';
import styles from './league.module.css';

function TeamRow({ team }) {
  if (team) {
    return (
      <tr className={styles.filled}>
        <td>{team.teamid}</td>
        <td>{team.ownerusername}</td>
      </tr>
    );
  } 
  return (
    <tr className={styles.empty}>
      <td>Empty</td>
      <td>Empty</td>
    </tr>
  );
}


export default function League() {
  const router = useRouter();
  const [teams, setTeams] = useState(null);
  const [error, setError] = useState('');
  const [leagueSize, setLeagueSize] = useState(0);

  const { id } = router.query;

  const enterDraftRoom = () => {
    return;
  }

  const fillEmptyAndSet = (apiResponse) => {
    setLeagueSize({
      max: apiResponse[0].numteams,
      current: apiResponse.length,
    });

    for (let i = 0; i < (leagueSize.max - leagueSize.current); i+1) {
      apiResponse.push(null);
    }

    setTeams(apiResponse);
  }

  useEffect(() => {
    const getTeams = async () => {
      if (!router.isReady || !router.query) {
        setError('')
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

      fillEmptyAndSet(responseBody);
    };

    getTeams();
  }, [router, id]);

  return (
    <HeaderAuthed>
      <h1 className={styles.title}>
        League
        {id}
        Home Page
      </h1>
      <div className={styles.tableIntro}>Teams (
        {leagueSize.current}
        /
        {leagueSize.max}
        ):
      </div>
      {teams
      && <table className={styles.teamTable}>
          <tr>
            <th>TeamID</th>
            <th>Team Owner</th>
          </tr>
          {teams.map((team) => (
            <TeamRow team={team}/>
          ))}
        </table>}
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
