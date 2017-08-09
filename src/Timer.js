import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';


export default class Timer extends Component {
  render() {
    const {buttonValue, startTimer, timerValue} = this.props;

    return (
      <div>
        <div className="tasker__timer-wrapper">
          <p className="tasker__timer-value">
            <span className="tasker__timer-hours">{timerValue.hours}:</span>
            <span className="tasker__timer-minutes">{timerValue.minutes}:</span>
            <span className="tasker__timer-seconds">{timerValue.seconds}</span>
          </p>
        </div>
        <div className="tasker__timer-button">
          <MuiThemeProvider>
            <RaisedButton label={buttonValue} labelColor="#3249c7" onClick={() => startTimer(Date.now())}/>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  buttonValue: PropTypes.string.isRequired,
  startTimer: PropTypes.func.isRequired,
  timerValue: PropTypes.object.isRequired
};
