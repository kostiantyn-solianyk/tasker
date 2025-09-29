import React from 'react';
import { Router, Route } from 'react-router';
import Main from './components/Main';
import TaskInfo from './components/TaskInfo';

// update with pr
const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={Main} />
    <Route path='/task-info/:id' component={TaskInfo} />
  </Router>
);

export default Routes;
