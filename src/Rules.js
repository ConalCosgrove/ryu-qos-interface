import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
class Rules extends Component {
    constructor(props) {
        super(props);
        this.state = {rules: null};
        this.layoutRules();
    }

    layoutRules() {
        getRules(this.props.id).then((res) => {
            console.log(res);
            if (JSON.parse(res)[0].command_result.result === 'failure') {
                this.setState({rules: 'No Rules Installed'})
            } else {
                const ruleTable = createRuleTable(JSON.parse(res)[0].command_result[0].qos);
                this.setState({rules: ruleTable});

            }
        });
    }

    render() {
        return this.state.rules ? this.state.rules : 'Loading Rule Info...';
    }
}


function getRules(id) {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3333/qos/rules/${id}`;
        fetch(url)
        .then((request) => {
            request.text().then((res) => {
                resolve(res);
            });
        })
        .catch((err) => {
            reject(err);
        });
    });
}

function createRuleTable(data) {
    return (
    
    <Table striped bordered hover>
    <thead>
        <tr>
        <th>Priority</th>
        <th>Dest. IP</th>
        <th>Dest. Port</th>
        <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {
            data && data.map((rule) => {

                    return <tr><td>{rule.priority}</td><td>{rule.nw_dst}</td><td>{rule.tp_dst}</td><td>{JSON.stringify(rule.actions)}</td></tr>

            })
        }
    </tbody>
    </Table>
    )
}

export default Rules;
