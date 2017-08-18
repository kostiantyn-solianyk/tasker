import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import muiTheme from './styles/StylesForMui';

const classes = {
  taskInfo: 'tasker__info',
  taskAdditional: 'tasker__additional'
};

export default class TaskInfo extends Component {

  render () {
    const props = this.props;
    const goBack = props.router.goBack;
    const task = props.location.state;

    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <RaisedButton label='Go back' onClick={() => goBack()} />
        </MuiThemeProvider>
        <div className={classes.taskInfo}>
          <h3>Name of tasks: {task.name}</h3>
          <p className={classes.taskAdditional}>Time start: {task.timeStart}</p>
          <p className={classes.taskAdditional}>Time end: {task.timeEnd}</p>
          <p className={classes.taskAdditional}>Time spend: {task.timeSpend}</p>
        </div>
      </div>
    );
  }

};
