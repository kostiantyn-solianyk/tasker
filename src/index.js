import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Router';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducers';
import './styles/index.css';

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <Routes history={browserHistory} />
  </Provider>, document.getElementById('root')
);
