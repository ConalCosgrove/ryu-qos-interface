import React, {Component} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class AddQueue extends Component {
    constructor(props) {
        super(props);
        const defaultPortName = this.props.switch.ports[0].name || null;
        const defaultType = 'linux-htb';
        const defaultMaxRate = 0;
        this.state = { port_name: defaultPortName, type: defaultType, max_rate: defaultMaxRate, queues: []};
    } 

    handleSubmit(event) {
        event.preventDefault();
        
      }

      formChange(e) {
          const className = e.nativeEvent.target.className.split(' ')[0];

          if (!className.match(/queue_\w*/g)) {
            const newState = {};
            newState[className] = e.nativeEvent.target.value;
            this.setState(newState);
          } else {
              const {queues} = this.state;
              const index = className.split('_rate')[1];
              const q = queues[index] ? queues[index] : {};
              let rate = className.split('queue_')[1];
              rate = rate.split('_rate')[0] + '_rate';
              const newRate = parseInt(e.nativeEvent.target.value)
              if (newRate || newRate === 0) {
                q[rate] = String(newRate);
                queues[index] = q;
                this.setState({queues});
              }
          }
          

      }

      queueRequest() {
          createQueue(this.state, this.props.switch.dpid).then((res) => {
          })
      }

    render() {
        return (
<div>

    <Form onSubmit={e => this.handleSubmit(e)}>
    Egress Port:
    <InputGroup className="mb-3">
        <Form.Control as="select"onChange={(e)=> {this.formChange(e)}} className='port_name'>
                {mapOptions(this.props.switch)}
        </Form.Control>
  </InputGroup>
    Queue Type:
  <InputGroup className="mb-3">
        <Form.Control as="select" onChange={(e)=> {this.formChange(e)}} className='type'>
                <option>linux-htb</option>
                <option>linux-other</option>
        </Form.Control>
  </InputGroup>
  Queue Total Max Rate:
  <InputGroup className="mb-3">
    <FormControl onChange={(e)=> {this.formChange(e)}} className='max_rate'
      placeholder="Max Rate"
      aria-describedby="basic-addon1"
    />
    <InputGroup.Append>
        <InputGroup.Text id="basic-addon2">bps</InputGroup.Text>
    </InputGroup.Append>
  </InputGroup >
  Queues:
  <InputGroup className="queue mb-3" onChange={(e) => this.formChange(e)}>
    <FormControl className='queue_min_rate0'
      placeholder="Min Rate"
      aria-describedby="basic-addon1"
    />
    <InputGroup.Append>
        <InputGroup.Text id="basic-addon2">bps</InputGroup.Text>
    </InputGroup.Append>

    <FormControl className='queue_max_rate0'
      placeholder="Max Rate"
      aria-describedby="basic-addon1"
    />
    <InputGroup.Append>
        <InputGroup.Text id="basic-addon2">bps</InputGroup.Text>
    </InputGroup.Append>
    </InputGroup>

    <InputGroup className="queue mb-3" onChange={(e) => this.formChange(e)}>
    <FormControl className='queue_min_rate1'
      placeholder="Min Rate"
      aria-describedby="basic-addon1"
    />
    <InputGroup.Append>
        <InputGroup.Text id="basic-addon2">bps</InputGroup.Text>
    </InputGroup.Append>
    <FormControl className='queue_max_rate1'
      placeholder="Max Rate"
      aria-describedby="basic-addon1"
    />
    <InputGroup.Append>
        <InputGroup.Text id="basic-addon2">bps</InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>
  <Button variant="primary" onClick={()=> this.queueRequest()}>
        Create
  </Button>
  </Form>
</div>
        )
    }
}

function mapOptions (options) {
    return (
        options.ports.map(port => <option key={port.name}>{port.name}</option>)
    )
}

function createQueue (data, path) {
    if (data.max_rate === 0) {
        console.log('delete max rate');
        delete data.max_rate;
    }
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3333/qos/queue/${path}`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then((res) => {
            resolve(res);
        })
    });
}
export default AddQueue;