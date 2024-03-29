import React, { useEffect, useState } from 'react';
import HeaderAuthed from '../../common/header-authed';
import Player from '../../components/player';
import styles from './draft.module.css';

export default function Draft() {
  const [apiResponse, setapiResponse] = useState([]);
  const [onClock, setOnClock] = useState(0);
  const [up, setUp] = useState(true);
  const [pick, setPick] = useState(1);
  const [teams, setTeams] = useState(4);
  const [teamIds, setTeamIds] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/all`)
      .then((res) => res.json())
      .then((json) => setapiResponse(json));
  }, []);

  const newDraft = () => {
    fetch(`${process.env.NEXT_PUBLIC_API}/newDraft`)
      .then((res) => res.json())
      .then((json) => json.map((x) => x.teamid))
      .then((arr) => ({ ...arr }))
      .then((nextjson) => {
        setTeams(Object.keys(nextjson).length);
        setTeamIds(nextjson);
      })
      .catch((error) => console.log(error));
  };

  const endDraft = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(results),
    };
    fetch(`${process.env.NEXT_PUBLIC_API}/endDraft`, requestOptions)
      .then((res) => res.text)
      .catch((error) => console.log(error));
  };

  const draft = (player) => {
    const picker = teamIds[onClock];
    const currentDraft = results;
    if (currentDraft[picker] === undefined) {
      currentDraft[picker] = [player];
    } else {
      currentDraft[picker].push(player);
    }
    setResults(currentDraft);
    setPick(pick + 1);

    // increment the pick counter
    if (pick % teams === 0) {
      setUp(!up);
    } else if (up) {
      setOnClock(onClock + 1);
    } else {
      setOnClock(onClock - 1);
    }
    if (pick === 3 * teams) {
      endDraft();
    }
  };

  const sortedList = apiResponse.sort(
    (a, b) => a.playerid - b.playerid,
  );

  return (
    <HeaderAuthed>
      <div className={styles.container}>
        <button
          type="button"
          onClick={newDraft}
          className={styles['new-draft']}
        >
          New Draft
        </button>
        <p className={styles['table-header']}>
          Pick
          {pick}
          , team
          {onClock + 1}
          {' '}
          on clock
        </p>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Team</th>
              <th>College</th>
              <th>Draft</th>
            </tr>
            {sortedList.map((value) => (
              <Player
                key={value.playerid}
                info={value}
                draft={draft}
                team={onClock}
              />
            ))}
          </tbody>
        </table>
      </div>
    </HeaderAuthed>
  );
}
