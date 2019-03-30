import React, {Component} from 'react';

class Meters extends Component {
    constructor(props) {
        super(props);
        this.state = {meters: null};
        this.layoutMeters();
    }

    layoutMeters() {
        getMeters(this.props.id).then((res) => {
            const meters = JSON.parse(res)[0].command_result;
            if (meters.result === 'failure') {
                this.setState({meters: 'No Meters Installed'})
            } else {
                this.setState({meters:meters});
            }
        });
    }

    printMeters(meters) {
        
    }

    render() {
        const id = parseInt(this.props.id);
        return (this.state.meters && this.state.meters[id] ? 
            this.state.meters[id].map((meter) => {
                return <div><p>id: {meter.meter_id} Bytes: {JSON.stringify(meter.band_stats[0].byte_band_count)} Packets {JSON.stringify(meter.band_stats[0].packet_band_count)}</p></div>
            })
            : 'Loading Meter Info...'
        )
    }
}


function getMeters(id) {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3333/qos/meter/${id}`;
        fetch(url)
        .then((request) => {
            request.text().then((res) => {
                console.log('GOT',res);
                resolve(res);
            });
        })
        .catch((err) => {
            reject(err);
        });
    });
}

export default Meters;