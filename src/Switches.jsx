import React from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const nodes = {source: null, destination: null};

class Switches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {switches: null, path: null};
    this.layoutSwitches();
  }

  formChange(e) {
    const className = e.nativeEvent.target.className.split(' ')[0];

    if (nodes[className] !== undefined) {
      nodes[className] = e.nativeEvent.target.value;
    }
  }

  clickHandler() {
    postCompute(nodes).then((path) => {
      console.log(path);
      const pth = JSON.parse(path).map((hop) => {
        return (
          `${hop} ➡️ `
        )
      });
      this.setState({path: pth});
    });
  }

  layoutSwitches() {
    getSwitches().then((res) => {
      const items = res.map((switcheroo) => {
        return (
          <tr>
          <td>{switcheroo.dpid}</td>
          </tr>
          )
      });
      this.setState({switches: items});
    });
  }

  render() {
    return (
      <div className='column'>
    <h1>Path Calculation:</h1>
    <Card style={{ width: '30rem', margin: '10px'}}>
    <Table striped bordered hover>
    <thead>
    <tr>
        <th>Network Switch IDs</th>
        </tr>
    </thead>
    <tbody>
    {this.state.switches}
    </tbody>
    </Table>
    </Card>

    <Card style={{ width: '30rem', margin: '10px'}}>
      <Card.Body>
      <h3>Compute A Path</h3>
      <Form onSubmit={e => this.handleSubmit(e)}>
    Source Id:
    <InputGroup className="mb-3">
        <FormControl onChange={(e)=> {this.formChange(e)}} className='source'
        placeholder="Source"
        aria-describedby="basic-addon1"
        />
    </InputGroup>
    Destination Id:
    <InputGroup className="mb-3">
        <FormControl onChange={(e)=> {this.formChange(e)}} className='destination'
        placeholder="Destination"
        aria-describedby="basic-addon1"
        />
    </InputGroup>
    <Button onClick={() => this.clickHandler()}>Calculate</Button>
    <Card.Text></Card.Text>
    
    </Form>
    </Card.Body>
    </Card>
    <h4>Path: {this.state.path ? this.state.path : 'Not Calculated'}</h4>
  </div>
    )
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

function postCompute(data) {
  console.log('Posting', data);
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3333/topology`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  .then((request) => {
    request.text().then((res) => {
        resolve(res);
    });
})
  })
}

export default Switches;