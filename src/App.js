import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {apiResponse: ""};
    this.callAPI();
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({apiResponse: res}));
  }


  render() {
    return (<div className="App">
        <header className="App-header">
          <p className="App-intro">{this.state.apiResponse}</p>
        </header>
      </div>
    )
  };
}

export default App;
