import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const TextColor = "#3249c7";
const style = {
  height: 250,
  width: 250,
  fontSize: 25,
  margin: '20px auto',
  textAlign: 'center',
  display: 'table',
};
const muiTheme = getMuiTheme({
  raisedButton: {
    textColor: TextColor
  }
});

export default class Timer extends Component {

  render() {
    const {btnValue, startTimer, timeSec} = this.props;
    let h = timeSec / 3600 ^ 0;
    let m = (timeSec - h * 3600) / 60 ^ 0;
    let s = timeSec - h * 3600 - m * 60;
    let result = ( h < 10 ? "0" + h : h ) + ':' + ( m < 10 ? "0" + m : m ) + ':' + ( s < 10 ? "0" + s : s );

    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Paper style={style}
                 zDepth={2}
                 circle={true}
                 children={<p className="tasker__time-value">{result}</p>}/>
        </MuiThemeProvider>
        <div className="tasker__timer-button">
          <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton label={btnValue} onClick={() => startTimer()}/>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  btnValue: PropTypes.string.isRequired,
  startTimer: PropTypes.func.isRequired,
  timeSec: PropTypes.number.isRequired
};
