import React, { useState, useEffect, ReactElement } from "react";
import "./App.css";
import Player from "./Player";
import PlayerInfo from "./PlayerInfo";
import Header from "./Header";
import NewUser from "./NewUser"
import Login from "./Login"

export default function App(): ReactElement {
  const [apiResponse, setapiResponse] = useState([]);
  const [onClock, setOnClock] = useState(0);
  const [up, setUp] = useState(true);
  const [pick, setPick] = useState(1);
  const [teams, setTeams] = useState(4);
  const [teamIds, setTeamIds] = useState({});
  const [players, setPlayers] = useState(3);
  const [results, setResults] = useState({});
  const [currentUser, setUser] = useState('Not logged in')

  useEffect(() => {
    fetch("https://modern-fantasy.herokuapp.com/all")
      .then((res) => res.json())
      .then((json) => setapiResponse(json));
  }, []);

  const newDraft = () => {
    fetch("https://modern-fantasy.herokuapp.com/newDraft")
      .then((res) => res.json())
      .then((json) => json.map((x) => x["teamid"]))
      .then((arr) => Object.assign({}, arr))
      .then((nextjson) => {
        setTeams(Object.keys(nextjson).length);
        setTeamIds(nextjson);
      })
      .catch((error) => console.log(error));
  };

  const endDraft = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    };
    fetch("https://modern-fantasy.herokuapp.com/endDraft", requestOptions)
      .then((res) => res.text)
      .catch((error) => console.log(error));
  };

  const draft = (player: string) => {
    let picker = teamIds[onClock];
    let currentDraft = results;
    if (currentDraft[picker] === undefined) {
      currentDraft[picker] = [player];
    } else {
      currentDraft[picker].push(player);
    }
    setResults(currentDraft);
    setPick(pick + 1);

    // check that draft is getting stored
    console.log(results);

    // increment the pick counter
    if (pick % teams === 0) {
      setUp(!up);
    } else if (up) {
      setOnClock(onClock + 1);
    } else {
      setOnClock(onClock - 1);
    }
    if (pick === players * teams) {
      endDraft();
    }
  };

  const sortedList: PlayerInfo[] = apiResponse.sort(
    (a: PlayerInfo, b: PlayerInfo) => {
      return a.playerid - b.playerid;
    }
  );

  return (
    <div className="App">
      <Header onClick={newDraft} />
      <NewUser />
      <Login />
      <h1>
        Pick{pick}, team{onClock + 1} on clock
      </h1>
      <table className="table">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Team</th>
            <th>College</th>
            <th>Draft</th>
          </tr>
          {sortedList.map((value: PlayerInfo, index: number) => {
            return (
              <Player key={index} info={value} draft={draft} team={onClock} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
