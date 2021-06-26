import React from 'react';
import './App.css';
import Player from './Player';
import PlayerInfo from './PlayerInfo';
import Header from './Header'

interface IProps {
}

interface IState {
  apiResponse: PlayerInfo[];
  onClock: number;
  up: boolean;
  pick: number;
  teams: number;
  teamIDs: object;
  players: number;
  results: object;
}

class App extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      apiResponse: [],
      onClock: 0,
      up: true,
      pick: 1,
      teams: 4,
      teamIDs: {},
      players: 16,
      results: {}
    }
  }

  callAPI() {
    fetch("https://modern-fantasy.herokuapp.com/all")
      .then(res => res.json())
      .then(json => this.setState({ apiResponse: json }));
  }

  componentDidMount() {
    this.callAPI();
  }

  newDraft() {
    fetch('https://modern-fantasy.herokuapp.com/newDraft')
      .then(res => res.json())
      .then(json => json.map(x => x['teamid']))
      .then(arr => Object.assign({}, arr))
      .then(nextjson => this.setState({ teams : Object.keys(nextjson).length,
                                        teamIDs : nextjson}) )
      .catch(error => console.log(error))
  }

  draft(player : string) {
    let picker = this.state.teamIDs[this.state.onClock]
    let currentDraft = this.state.results;
    if (currentDraft[picker] === undefined) {
      currentDraft[picker] = [player]
    } else {
      currentDraft[picker].push(player)
    }
    this.setState({
      results : currentDraft,
      pick : this.state.pick + 1
    })

    // check that draft is getting stored
    console.log(this.state.results)

    // increment the pick counter
    if (this.state.pick <= this.state.players * this.state.teams) {
      if (this.state.pick % this.state.teams === 0) {
        this.setState({ up: !this.state.up })
      }
      else if (this.state.up) {
        this.setState({ onClock: this.state.onClock + 1 })
      }
      else {
        this.setState({ onClock: this.state.onClock - 1 })
      }
    }
  }


  render() {

    const sortedList: PlayerInfo[] = this.state.apiResponse.sort(
      function (a: PlayerInfo, b: PlayerInfo) { return a.playerid - b.playerid });

    return (
      <div className="App">
        <Header onClick={() => this.newDraft()} />
        <h1>Pick{this.state.pick}, team{this.state.onClock + 1} on clock</h1>
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
              return <Player key={index} info={value} draft={this.draft.bind(this)} 
                             team={this.state.onClock}/>
            })}
          </tbody>
        </table>
      </div>
    )
  };
}

export default App;
