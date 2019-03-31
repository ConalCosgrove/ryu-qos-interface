import React, { Component } from 'react';
import Switches from './Switches';
import QueueOnSwitch from './QueueOnSwitch';
import Button from 'react-bootstrap/Button';
import './App.css';

class App extends Component {
  constructor(props) {
    super();
  }

  renderExperiment () {
    switch (this.props.experiment) {
      case 0: {
        return <QueueOnSwitch/>
      }
      case 1: {
        return <Switches/>
      }
      default: {
        return <h1>hi</h1>
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Experiments:</h3>
          <Button variant="dark" onClick={() => this.props.setExperiment(0)}>#1</Button>
          <Button variant="dark" onClick={() => this.props.setExperiment(1)}>#2</Button>
          <Button variant="dark" onClick={() => this.props.setExperiment(2)}>#3</Button>
        </header>
        <div className='mainContainer'>
          {this.renderExperiment()}
        </div>
      </div>
    );
  }
}

export default App;
