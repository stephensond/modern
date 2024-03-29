import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classes from './player.module.css';

export default function Player({ info, team, draft }) {
  const {
    playerid, playername, pos, school,
  } = info;
  const [isDrafted, setIsDrafted] = useState(false);

  const callAPI = () => {
    // I don't think this API call is doing anything significant at this point
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: playerid, team }),
    };
    fetch(`${process.env.NEXT_PUBLIC_API}/draft`, requestOptions)
      .then((res) => res.text())
      .then((text) => console.log(`Updated player with id ${text}`))
      .catch((error) => console.log(error));
    setIsDrafted(!isDrafted);
    draft(playername);
  };

  let text = 'Draft';
  let check = '';
  if (isDrafted) {
    text = 'Undo';
    check = '✓';
  }

  return (
    <tr className={classes.playerRow}>
      <td>{playerid}</td>
      <td>{playername}</td>
      <td>{pos}</td>
      <td>{team}</td>
      <td>{school}</td>
      <td>
        <button
          onClick={callAPI}
          className={`${classes.button} ${classes[text]}`}
          type="button"
        >
          {text}
        </button>
      </td>
      <td>{check}</td>
    </tr>
  );
}

Player.propTypes = {
  info: PropTypes.shape({
    playerid: PropTypes.number.isRequired,
    playername: PropTypes.string.isRequired,
    pos: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
  }).isRequired,
  team: PropTypes.number.isRequired,
  draft: PropTypes.func.isRequired,
};
