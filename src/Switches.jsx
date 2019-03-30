import React from 'react';
import Queues from './QOS';
import Rules from './Rules';
import Meters from './Meters';
import AddMeter from './AddMeter';
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
            <h2>Switch {parseInt(swi.dpid)}</h2>
            <p> Ports: {swi.ports.map(p => <li>{p.name}, port_no: {parseInt(p.port_no)}, hw_addr: {p.hw_addr}</li>)}</p>
            <p> Queues: <Queues id={swi.dpid}/></p>
            <p> Rules: <Rules id={swi.dpid}/></p>
            <p> Meters: <Meters id={swi.dpid}/></p>

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