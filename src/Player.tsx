import React from 'react';
import PlayerInfo from './PlayerInfo';
import "./App.css"

interface IProps {
    key: number;
    info: PlayerInfo;
    draft: any;
    team : number;
}

interface IState {
    isDrafted: boolean;
}

class Player extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { isDrafted: this.props.info.isdrafted };
    }

    // componentDidMount() {
    //     fetch("http://localhost:9000/" + this.props.info.playerid)
    //         .then(res => res.json())
    //         .then(json => this.setState({ isDrafted: json.isdrafted }));
    // }

    callAPI() {
        const currentIsDrafted: boolean = this.state.isDrafted;
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ id: this.props.info.playerid, team : this.props.team}),
        };
        fetch("https://modern-fantasy.herokuapp.com/draft", requestOptions)
            .then(res => res.text())
            .then(text => console.log('Updated player with id ' + text))
            .catch(error => console.log(error));
        this.setState({
            isDrafted: !currentIsDrafted,
        })
        this.props.draft(this.props.info.playerid);
    }


    render() {

        let text = "Draft";
        let check = "";
        if (this.state.isDrafted) {
            text = "Undo";
            check = "✓";
        }
        let buttonclass = "button " + text
        return <tr className="playerRow">
            <td>{this.props.info.playerid}</td>
            <td>{this.props.info.playername}</td>
            <td>{this.props.info.pos}</td>
            <td>{this.props.info.team}</td>
            <td>{this.props.info.school}</td>
            <td><button
                onClick={() => this.callAPI()}
                className={buttonclass}
            >{text}</button></td>
            <td>{check}</td>
        </tr>
    }

}

export default Player;
