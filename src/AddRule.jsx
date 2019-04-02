import React, {Component} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class AddRule extends Component {
    constructor(props) {
        super(props);
        const defaultPortName = this.props.switch.ports[0].name || null;
        const defaultType = 'linux-htb';
        const defaultMaxRate = 0;
        this.state = { actions: {}, match: {}};
    } 

    handleSubmit(event) {
        event.preventDefault();
        
      }

      formChange(e) {
          const className = e.nativeEvent.target.className.split(' ')[0];

          if (!className.match(/rule_\w*/g)) {
            const newState = {};
            newState[className] = e.nativeEvent.target.value;
            this.setState(newState);
          } else {
              const {rules} = this.state;
              const index = className.split('_rate')[1];
              const q = rules[index] ? rules[index] : {};
              let rate = className.split('rule_')[1];
              rate = rate.split('_rate')[0] + '_rate';
              const newRate = parseInt(e.nativeEvent.target.value)
              if (newRate || newRate === 0) {
                q[rate] = String(newRate);
                rules[index] = q;
                this.setState({rules});
              }
          }
          

      }

      ruleRequest() {
          createRule(this.state, this.props.switch.dpid).then((res) => {
          })
      }

    render() {
        return (
<div>

    <Form onSubmit={e => this.handleSubmit(e)}>
    Priority:
    <InputGroup className="mb-3">
        <FormControl onChange={(e)=> {this.formChange(e)}} className='priority'
        placeholder="Priority"
        aria-describedby="basic-addon1"
        />
    </InputGroup>
  Source IP:
    <InputGroup className="mb-3">
        <FormControl onChange={(e)=> {this.formChange(e)}} className='nw_src'
        placeholder="Source IP"
        aria-describedby="basic-addon1"
        />
    </InputGroup>
    Source Port:
    <InputGroup className="mb-3">
        <FormControl onChange={(e)=> {this.formChange(e)}} className='tp_src'
        placeholder="Source Port"
        aria-describedby="basic-addon1"
        />
    </InputGroup>
    Destination IP:
    <InputGroup className="mb-3">
        <FormControl onChange={(e)=> {this.formChange(e)}} className='nw_dst'
        placeholder="Destination IP"
        aria-describedby="basic-addon1"
        />
    </InputGroup>
    Destination Port:
    <InputGroup className="mb-3">
        <FormControl onChange={(e)=> {this.formChange(e)}} className='tp_dst'
        placeholder="Destination Port"
        aria-describedby="basic-addon1"
        />
    </InputGroup>
    Assign to Queue (id)
    <InputGroup className="mb-3">
        <FormControl onChange={(e)=> {this.formChange(e)}} className='queue'
        placeholder="Destination IP"
        aria-describedby="basic-addon1"
        />
    </InputGroup>
    Assign to Meter (id)
    <InputGroup className="mb-3">
        <FormControl onChange={(e)=> {this.formChange(e)}} className='meter'
        placeholder="Destination Port"
        aria-describedby="basic-addon1"
        />
    </InputGroup>
  
  <Button variant="primary" onClick={()=> this.ruleRequest()}>
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

function createRule (data, path) {
    console.log(data);
    Object.keys(data).forEach((parameter) => {
        if (data[parameter] === '') {
            delete data[parameter];
        } else if (parameter === 'queue' || parameter === 'meter') {
            const id  = data[parameter];
            data.actions = data.actions ? data.actions : {};
            data.actions[parameter] = id;
            delete data[parameter];
        } else if (parameter !== 'priority') {
            data.match = data.match ? data.match : {};
            const value = data[parameter];
            data['match'][parameter] = value;
            delete data[parameter];
        }
    });
    data.match['nw_proto'] = 'UDP';
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3333/qos/rules/${path}`, {
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
export default AddRule;