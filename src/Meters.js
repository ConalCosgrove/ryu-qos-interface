import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
class Meters extends Component {
    constructor(props) {
        super(props);
        this.state = {meters: null};
        this.layoutMeters();
    }

    layoutMeters() {
        getMeters(this.props.id).then((res) => {
            const meters = JSON.parse(res)[0].command_result;
            if (meters[parseInt(this.props.id)] && meters[parseInt(this.props.id)].length) {
                this.setState({meters: meters})
            } else {
                this.setState({meters: 'No Meters Installed'});
            }
        });
    }

    printMeters(meters) {
        
    }

    render() {
        const id = parseInt(this.props.id);
        return (this.state.meters && this.state.meters !== 'No Meters Installed' && this.state.meters[id] ? 

        <Table striped bordered hover>
        <thead>
            <tr>
            <th>Id</th>
            <th>Byte Count</th>
            <th>Packet Count</th>
            </tr>
        </thead>
        <tbody>
            {
                this.state.meters[id].map((meter) => {
                    return (
                        <tr>
                            <td>{meter.meter_id}</td><td>{JSON.stringify(meter.band_stats[0].byte_band_count)}</td><td>{JSON.stringify(meter.band_stats[0].packet_band_count)}</td>
                        </tr>)
                })
            }
        </tbody>
        </Table>
        : 'No Meters Installed'
        )
    }
}


function getMeters(id) {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3333/qos/meter/${id}`;
        fetch(url)
        .then((request) => {
            request.text().then((res) => {
                resolve(res);
            });
        })
        .catch((err) => {
            reject(err);
        });
    });
}

export default Meters;