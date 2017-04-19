import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {HashRouter as Router, Route, Link } from 'react-router-dom';
import App from './components/app';
import Result from './components/question-result';
import './index.css';

const routes = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/api/question/results" component={Result} />
        </div>
    </Router>
)

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
  document.getElementById('root')
);
