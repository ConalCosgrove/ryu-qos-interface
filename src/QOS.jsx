import {Component} from 'react';

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
                this.setState({queues: res});
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

export default Queues;