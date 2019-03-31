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
          console.log(className);

          if (!className.match(/queue_\w*/g)) {
            const newState = {};
            newState[className] = e.nativeEvent.target.value;
            this.setState(newState);
          } else {
              const {queues} = this.state;
              const q = queues[0] ? queues[0] : {};
              const rate = className.split('queue_')[1];
              const newRate = parseInt(e.nativeEvent.target.value)
              if (newRate || newRate === 0) {
                q[rate] = String(newRate);
                queues[0] = q;
                this.setState({queues});
              }
          }
          

      }

      queueRequest() {
          createQueue(this.state, this.props.switch.dpid).then((res) => {
              console.log(res);
          })
      }

    render() {
        return (
<div>
    <Form onSubmit={e => this.handleSubmit(e)}>
    <InputGroup className="mb-3">
        <Form.Control as="select"onChange={(e)=> {this.formChange(e)}} className='port_name'>
                {mapOptions(this.props.switch)}
        </Form.Control>
  </InputGroup>

  <InputGroup className="mb-3">
        <Form.Control as="select" onChange={(e)=> {this.formChange(e)}} className='type'>
                <option>linux-htb</option>
                <option>linux-other</option>
        </Form.Control>
  </InputGroup>
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
    <FormControl className='queue_min_rate'
      placeholder="Min Rate"
      aria-describedby="basic-addon1"
    />
    <InputGroup.Append>
        <InputGroup.Text id="basic-addon2">bps</InputGroup.Text>
    </InputGroup.Append>
    <FormControl className='queue_max_rate'
      placeholder="Max Rate"
      aria-describedby="basic-addon1"
    />
    <InputGroup.Append>
        <InputGroup.Text id="basic-addon2">bps</InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>
  <Button varaint="Secondary">Add Queue</Button>
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