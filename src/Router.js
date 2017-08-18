import React from 'react';
import { Router, Route } from 'react-router';
import Main from './Main';
import TaskInfo from './TaskInfo';

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={Main} />
    <Route path='/task-info/:id' component={TaskInfo} />
  </Router>
);

export default Routes;
