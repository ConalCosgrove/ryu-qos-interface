import React from 'react';
import Queues from './Queues';
import Rules from './Rules';
import Meters from './Meters';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
class Switches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {switches: null};
    this.layoutSwitches();
  }
  layoutSwitches() {
    getSwitches().then((res) => {
      const layout = res.map(function (swi) {
        return (
        <div>

            <Card style={{ width: '25rem', margin: '10px'}}>
              <Card.Body>
                <Card.Title>Switch {parseInt(swi.dpid)}</Card.Title>

                <div>Ports: {swi.ports.map(p => <li>{p.name}, port_no: {parseInt(p.port_no)}, hw_addr: {p.hw_addr}</li>)}</div>
                <div>Queues: <Queues id={swi.dpid}/></div>
                <div>Rules: <Rules id={swi.dpid}/></div>
                <div>Meters: <Meters id={swi.dpid}/></div>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>


        </div>
        )
      })
      this.setState({switches: layout});
    });
  }

  render() {
    return this.state.switches ? this.state.switches : <p>Loading Switches...</p>;
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

export default Switches;