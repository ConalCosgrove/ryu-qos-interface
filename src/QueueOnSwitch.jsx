import React from 'react';
import Queues from './Queues';
import Meters from './Meters';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AddQueue from './AddQueue';
import AddMeter from './AddMeter';
import Rules from './Rules';
import AddRule from './AddRule';

const METER = 0; 
const QUEUE = 1;
const RULE = 2;
const THINGS_TO_ADD = { 0: 'Meter', 1: 'Queue', 2: 'Rule'};

class QueueOnASwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {switches: null, beingAdded:{}, switchesAdding:{}, refresh: true};
    this.addMeter = this.addMeter.bind(this);
    this.addQueue = this.addQueue.bind(this);
    this.layoutSwitches();
  }

  componentDidMount() { 
  }

  addMeter(index) {
    const { beingAdded, switchesAdding } = this.state;
    beingAdded[index] = METER;
    switchesAdding[index] = !!!switchesAdding[index];
    this.setState({beingAdded, switchesAdding},() => {
        this.layoutSwitches();
    });
  }

  addQueue(index) {
    const { beingAdded, switchesAdding } = this.state;
    beingAdded[index] = QUEUE;
    switchesAdding[index] = !!!switchesAdding[index];
    this.setState({beingAdded, switchesAdding},() => {
        this.layoutSwitches();
    });
  }

  addRule(index) {
    const { beingAdded, switchesAdding } = this.state;
    beingAdded[index] = RULE;
    switchesAdding[index] = !!!switchesAdding[index];
    this.setState({beingAdded, switchesAdding},() => {
        this.layoutSwitches();
    });
  }

  layoutSwitches() {
    const { beingAdded, switchesAdding } = this.state;
    getSwitches().then((res) => {
      
      const layout = res.map( (swi, index) => {
        return (
        <div className='row'>

            <Card style={{ width: '30rem', margin: '10px'}}>
              <Card.Body>
                <Card.Title><h2>Switch {parseInt(swi.dpid)}</h2></Card.Title>
                <div><h3>Queues:</h3><Queues id={swi.dpid}/></div>
                <Button variant="primary" onClick={() => this.addQueue(index)}>Add A Queue</Button>
                <div><h3>Rules:</h3><Rules id={swi.dpid}/></div>
                <Button variant="primary" onClick={() => this.addRule(index)}>Add A Rule</Button>
                <div><h3>Meters:</h3><Meters id={swi.dpid}/></div>
                <Button variant="primary" onClick={() => this.addMeter(index)}>Add A Meter</Button>
                <Card.Text></Card.Text>
                <Button variant="danger" onClick={() => deleteQueuesAndMeters(swi.dpid)}>Reset</Button>
              </Card.Body>
            </Card>

            {constructAddPane(beingAdded, switchesAdding, index, swi)}
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

function constructAddPane(beingAdded, switchesAdding, index, swi) {
    let addbit = null;
    switch(beingAdded[index]) {
        case QUEUE:
            addbit = <AddQueue switch={swi}/>
            break;
        case METER:
            addbit = <AddMeter/>
            break;
        case RULE:
            addbit = <AddRule switch={swi}/>
            break;
        default:
            addbit = null;
    } 
    return (switchesAdding[index] ? (
    <Card style={{ width: '25rem', margin: '10px'}}>
        <Card.Body>
            <Card.Title>Add a {THINGS_TO_ADD[beingAdded[index]]}:</Card.Title>
            {addbit}
            <Card.Text></Card.Text>
        </Card.Body>
    </Card>) : null)
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

function deleteQueuesAndMeters(id) {
    return new Promise ((resolve, reject) => {
        fetch(`http://localhost:3333/qos/queue/${id}`,{
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    })
        .then((request) => {
            request.text().then((res) => {
                resolve(JSON.parse(res));
            });
    })
    });
}

export default QueueOnASwitch;