import React, {Component} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';


class AddMeter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
<div>
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Port Name"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
</div>
        )
    }
}

export default AddMeter;