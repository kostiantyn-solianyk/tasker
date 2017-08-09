import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from "react-tap-event-plugin"
import Timer from './Timer';
import './Main.css';

injectTapEventPlugin();

const inputColor = '#3249c7';
const muiTheme = getMuiTheme({
  textField: {
    textColor: inputColor,
    hintColor: inputColor,
    focusColor: inputColor
  }
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonValue: false,
      hours: '00',
      minutes: '00',
      seconds: '00'
    };
  }

  startTimer = () => {
    this.setState(prevState => ({
      buttonValue: !prevState.buttonValue
    }));
  };


  render() {
    const {hours, minutes, seconds} = this.state;
    return (
      <div className="tasker">
        <MuiThemeProvider muiTheme={muiTheme}>
          <TextField hintText="Start typing..." floatingLabelText="Name of your task"/>
        </MuiThemeProvider>

        <Timer timerValue={{hours, minutes, seconds}} startTimer={this.startTimer}
               buttonValue={this.state.buttonValue ? 'stop' : 'start'}/>
      </div>
    );
  }
}

export default Main;
