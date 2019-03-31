import React from 'react';
import Queues from './Queues';
import Rules from './Rules';
import Meters from './Meters';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AddQueue from './AddQueue';
import AddMeter from './AddMeter';

const METER = 0; 
const QUEUE = 1;
const THINGS_TO_ADD = { 0: 'Meter', 1: 'Queue'};

class QueueOnASwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {switches: null, beingAdded:{}, switchesAdding:{}};
    this.addMeter = this.addMeter.bind(this);
    this.addQueue = this.addQueue.bind(this);
  }

  componentDidMount() { 
    this.layoutSwitches();
  }

  addMeter(index) {
    const { beingAdded, switchesAdding } = this.state;
    beingAdded[index] = METER;
    switchesAdding[index] = true;
    this.setState({beingAdded, switchesAdding},() => {
        this.layoutSwitches();
    });
  }

  addQueue(index) {
    const { beingAdded, switchesAdding } = this.state;
    beingAdded[index] = QUEUE;
    switchesAdding[index] = true;
    this.setState({beingAdded, switchesAdding},() => {
        this.layoutSwitches();
    });
  }

  layoutSwitches() {
    const {beingAdded} = this.state;
    getSwitches().then((res) => {
      
      const layout = res.map( (swi, index) => {
        return (
        <div className='row'>

            <Card style={{ width: '25rem', margin: '10px'}}>
              <Card.Body>
                <Card.Title>Switch {parseInt(swi.dpid)}</Card.Title>
                <div>Queues: <Queues id={swi.dpid}/></div>
                <div>Meters: <Meters id={swi.dpid}/></div>
                <Card.Text></Card.Text>
                <Button variant="primary" onClick={() => this.addMeter(index)}>Add A Meter</Button>
                
                <Button variant="primary" onClick={() => this.addQueue(index)}>Add A Queue</Button>
              </Card.Body>
            </Card>

            {this.state.switchesAdding[index] ? (
            <Card style={{ width: '25rem', margin: '10px'}}>
                <Card.Body>
                    <Card.Title>Add a {THINGS_TO_ADD[beingAdded[index]]}:</Card.Title>
                    
                    {beingAdded && beingAdded[index] === QUEUE ?
                        <AddQueue switch={swi}/>:
                        <AddMeter/>
                    }
                    <Card.Text></Card.Text>
                </Card.Body>
            </Card>) : null}
        </div>
        )
      })
      this.setState({switches: layout});
    });
  }

  render() {
    return (
        <div className='columnHolder'>
            <div className='column'>
                {this.state.switches ? this.state.switches : <p>Loading Switches...</p>}
            </div>
        </div> 
    );
  }
}

function getSwitches() {
    return new Promise ((resolve, reject) => {
        fetch('http://localhost:3333/switches')
        .then((request) => {
            request.text().then((res) => {
                resolve(JSON.parse(res));
            });
    })
    });
}

export default QueueOnASwitch;