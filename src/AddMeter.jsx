import React, {Component} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class AddMeter extends Component {


    render() {
        return (
<div>
  <InputGroup className="mb-3">
    <FormControl
      placeholder="Rate"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
    <Button>Create</Button>
  </InputGroup>
</div>
        )
    }
}

export default AddMeter;