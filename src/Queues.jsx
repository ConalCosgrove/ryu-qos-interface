import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
class Queues extends Component {
    constructor(props) {
        super(props);
        this.state = {queues: null};
        this.layoutQueues();
    }

    layoutQueues() {
        getQueues(this.props.id).then((res) => {
            if (JSON.parse(res)[0].command_result.result === 'failure') {
                this.setState({queues: 'No Queues Installed'})
            } else {
                const queueTable = createQueueTable(JSON.parse(res)[0].command_result.details);
                this.setState({queues: queueTable});

            }
        });
    }

    render() {
        return this.state.queues ? this.state.queues : 'Loading Queue Info...';
    }
}


function getQueues(id) {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3333/qos/queue/${id}`;
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

function createQueueTable(data) {
    return (
    
    <Table striped bordered hover>
    <thead>
        <tr>
        <th>Port Name</th>
        <th>Min Rate</th>
        <th>Max Rate</th>
        </tr>
    </thead>
    <tbody>
        {
            data && Object.keys(data).map((portName) => {
                return Object.keys(data[portName]).map((id) => {
                    const queue = data[portName][id].config;
                    console.log(queue)
                    return <tr><td>{portName}</td><td>{queue['min-rate']}</td><td>{queue['max-rate']}</td></tr>
                })
            })
        }
    </tbody>
    </Table>
    )
}

export default Queues;

/**
 *         <tr>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        </tr>
        <tr>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        </tr>
        <tr>
        <td colSpan="2">Larry the Bird</td>
        <td>@twitter</td>
        </tr>
 */