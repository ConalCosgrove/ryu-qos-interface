import React, {Component} from 'react';

class Rules extends Component {
    constructor(props) {
        super(props);
        this.state = {rules: null};
        this.layoutRules();
    }

    layoutRules() {
        getRules(this.props.id).then((res) => {
            if (JSON.parse(res)[0].command_result.result === 'failure') {
                this.setState({rules: 'No Rules Installed'})
            } else {
                this.setState({rules: JSON.parse(res)[0].command_result});
            }
        });
    }

    render() {
        return (this.state.rules ? 
            <div> {
                this.state.rules.map((rule) => {
                    return <div> {JSON.stringify(rule)} </div>
                })
                }
            </div>
        : 'Loading Rule Info...'
        )
    }
}


function getRules(id) {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3333/qos/rules/${id}`;
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

export default Rules;