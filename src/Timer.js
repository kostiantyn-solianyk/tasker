import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const textColor = "#3249c7";
const classes = {
  paper: "tasker__timer-paper",
  paperChild: "tasker__time-value"
};
const muiTheme = getMuiTheme({
  raisedButton: {
    textColor: textColor
  }
});

export default class Timer extends Component {
  render() {
    const {btnValue, startTimer, endTimer, timeSec} = this.props;

    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Paper className={classes.paper}
                 zDepth={2}
                 circle={true}
                 children={
                   <p className={classes.paperChild}>{timeSec}</p>}/>
        </MuiThemeProvider>
        {btnValue === "start" &&
        <MuiThemeProvider muiTheme={muiTheme}>
          <RaisedButton label={btnValue} onClick={() => startTimer()}/>
        </MuiThemeProvider>
        }
        {btnValue === "stop" &&
        <MuiThemeProvider muiTheme={muiTheme}>
          <RaisedButton label={btnValue} onClick={() => endTimer()}/>
        </MuiThemeProvider>
        }
      </div>
    );
  }
}

Timer.propTypes = {
  btnValue: PropTypes.string.isRequired,
  startTimer: PropTypes.func.isRequired,
  endTimer: PropTypes.func.isRequired,
  timeSec: PropTypes.string.isRequired
};
