import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
let exp = 0;

function setExperiment(experiment) {
    console.log('hi');
    exp = experiment;
    renderUI();
}

function renderUI() {
    ReactDOM.render(<App experiment={exp} setExperiment={setExperiment}/>, document.getElementById('root'));
}

renderUI();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
