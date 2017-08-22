import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const classes = {
  paper: 'tasker__timer-paper',
  paperChild: 'tasker__time-value'
};

export default class Timer extends Component {

  render () {
    const {btnValue, startTimer, endTimer, timeSec, muiTheme} = this.props;

    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Paper
              className={classes.paper}
              zDepth={2}
              circle
              children={<p className={classes.paperChild}>{timeSec}</p>} />
            {btnValue === 'start' &&
            <RaisedButton label={btnValue} onClick={() => startTimer()} />
            }
            {btnValue === 'stop' &&
            <RaisedButton label={btnValue} onClick={() => endTimer()} />
            }
          </div>
        </MuiThemeProvider>
      </div>
    );
  };

};

Timer.propTypes = {
  btnValue: PropTypes.string.isRequired,
  startTimer: PropTypes.func.isRequired,
  endTimer: PropTypes.func.isRequired,
  timeSec: PropTypes.string.isRequired
};
