import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from "react-tap-event-plugin"
import Timer from './Timer';
import TableData from './Table'
import './Main.css';
injectTapEventPlugin();

const TextColor = '#3249c7';
const muiTheme = getMuiTheme({
  textField: {
    textColor: TextColor,
    hintColor: TextColor,
    focusColor: TextColor
  }
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnValue: false,
      textFieldValue: '',
      timeSec: 0
    };
  }

  componentWillUpdate = () => {
    clearInterval(this.timer);
  };

  componentDidUpdate = () => {
    const currentTimer = this.state.timeSec;

    if (this.state.btnValue) {
      this.timer = setInterval(() => {
        this.setState({
          timeSec: currentTimer + 1
        });
      }, 1000);
    }
  };

  startTimer = () => {
    if (this.state.timeSec === 0 || this.state.textFieldValue.length > 0) {
      this.setState(prevState => ({
        btnValue: !prevState.btnValue,
        timeSec: 0
      }));
    } else {
      alert("you need to enter your task");
    }
  };

  handleTextFieldChange = ({target: {value}}) => {
    this.setState({
      textFieldValue: value
    });
  };

  render() {
    const {timeSec} = this.state;

    return (
      <div className="tasker">
        <MuiThemeProvider muiTheme={muiTheme}>
          <TextField
            hintText="Start typing..."
            floatingLabelText="Name of your task"
            className="tasker__text-field"
            value={this.state.textFieldValue}
            onChange={this.handleTextFieldChange}/>
        </MuiThemeProvider>

        <Timer timeSec={timeSec} startTimer={this.startTimer}
               btnValue={this.state.btnValue ? 'stop' : 'start'}/>

        <TableData />
      </div>
    );
  }
}

export default Main;
