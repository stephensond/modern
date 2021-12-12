import React, { useCallback, useContext, useState } from 'react';
import httpRequest from '../../api';
import Header from '../../components/header';
import LinkTo from '../../components/linkto';
import { UserContext } from '../../context/useUserContext';
import styles from './create-league.module.css';

export default function CreateLeague() {
  const { user } = useContext(UserContext);
  const [error, setError] = useState('');
  const [leagueName, setLeagueName] = useState('');
  const [numTeams, setNumTeams] = useState('');
  const [numPlayers, setNumPlayers] = useState('');

  const createLeague = useCallback(async (e) => {
    e.preventDefault();

    if (numTeams * numPlayers > 400) {
      setError('Too many players in the league');
      return;
    }

    const { ok } = await httpRequest({
      method: 'POST',
      requestBody: JSON.stringify({
        leaguename: leagueName,
        leagueowner: user,
        numteams: numTeams,
        numplayers: numPlayers,
      }),
      endpoint: '/newleague',
    });

    if (!ok) {
      setError('Could not create league');
      return;
    }

    setError('success');
  }, [leagueName, numPlayers, numTeams, user]);

  const updateLeagueName = (event) => {
    setError('');
    setLeagueName(event.target.value);
  };

  const updateNumTeams = (event) => {
    setError('');
    setNumTeams(event.target.value);
  };

  const updateNumPlayers = (event) => {
    setError('');
    setNumPlayers(event.target.value);
  };

  return (
    <Header>
      <div className={styles.container}>
        <form onSubmit={createLeague} className={styles['inner-container']}>
          <p className={styles['create-league']}>Create League</p>
          {error && (<p className={styles.error}>{error}</p>)}
          <label htmlFor="league-name" className={styles['input-box']}>
            League Name
            <input
              type="text"
              onChange={updateLeagueName}
              id="league-name"
              className={styles.input}
              placeholder="Enter league name"
            />
          </label>
          <label htmlFor="num-teams" className={styles['input-box']}>
            Number of teams
            <input
              type="number"
              onChange={updateNumTeams}
              id="num-teams"
              className={styles.input}
              placeholder="Enter number of teams"
            />
          </label>
          <label htmlFor="num-players" className={styles['input-box']}>
            Number of players per team
            <input
              type="number"
              onChange={updateNumPlayers}
              id="num-players"
              className={styles.input}
              placeholder="Enter number of players per team"
            />
          </label>
          <button
            className={styles.submit}
            type="submit"
          >
            Submit
          </button>
          <LinkTo href="/" className={styles['go-back']}>
            Go Back
          </LinkTo>
        </form>
      </div>
    </Header>
  );
}
