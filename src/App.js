import React, { Component } from 'react';
import Switches from './Switches';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Switches></Switches>
        </header>
      </div>
    );
  }
}

export default App;
