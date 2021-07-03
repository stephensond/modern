import { ReactElement, useState } from "react";
import PlayerInfo from "./PlayerInfo";
import "./Draft.css";

interface PlayerProps {
  key: number;
  info: PlayerInfo;
  draft: any;
  team: number;
}

export default function Player(props: PlayerProps): ReactElement {
  const [isDrafted, setIsDrafted] = useState(props.info.isdrafted);

  const callAPI = () => {
    // I don't think this API call is doing anything significant at this point
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.info.playerid, team: props.team }),
    };
    fetch(process.env.REACT_APP_API + "/draft", requestOptions)
      .then((res) => res.text())
      .then((text) => console.log("Updated player with id " + text))
      .catch((error) => console.log(error));
    setIsDrafted(!isDrafted);
    props.draft(props.info.playername);
  };

  let text = "Draft";
  let check = "";
  if (isDrafted) {
    text = "Undo";
    check = "✓";
  }
  let buttonclass = "button " + text;
  return (
    <tr className="playerRow">
      <td>{props.info.playerid}</td>
      <td>{props.info.playername}</td>
      <td>{props.info.pos}</td>
      <td>{props.info.team}</td>
      <td>{props.info.school}</td>
      <td>
        <button onClick={callAPI} className={buttonclass}>
          {text}
        </button>
      </td>
      <td>{check}</td>
    </tr>
  );
}
