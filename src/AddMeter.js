import React, {Component} from 'react';

class AddMeter extends Component {
    constructor(props) {
        super(props);
        this.state = {queues: null};
    }

    handleSubmit() {
        
    }

    handleChange() {
        console.log('Change');
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <label>
              Add a Meter:
              <input type="text" onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        )
    }
}

function postData(url, data) {
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
}


export default AddMeter;