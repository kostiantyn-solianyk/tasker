import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from "react-tap-event-plugin";
import Timer from './Timer';
import TableData from './Table';
import './Main.css';
injectTapEventPlugin();

const TextColor = '#3249c7';
const classes = {
  main: "tasker",
  textField: "tasker__text-field",
  btnStart: "tasker__timer-button"
};
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
    const defaultState = {
      btnValue: false,
      timeSec: 0,
      currentTimeStart: '',
      textFieldValue: '',
      openModal: false,
      tasks: []
    };
    const stateFromLS = localStorage.getItem("state");
    this.state = stateFromLS ? JSON.parse(stateFromLS) : defaultState;
  }

  handleModalOpen = () => {
    this.setState({openModal: true});
  };

  handleModalClose = () => {
    this.setState({openModal: false});
    this.refs.textField.focus();
  };

  handleTextFieldChange = ({target: {value}}) => {
    this.setState({
      textFieldValue: value
    });
  };

  handleTick = () => {
    const currentTime = new Date();
    this.setState({
      timeSec: Math.floor((currentTime - new Date(this.state.currentTimeStart)) / 1000)
    });
  };

  componentWillUpdate = (nextProps, nextState) => {
    localStorage.setItem("state", JSON.stringify(nextState));
  };

  componentDidMount = () => {
    if (this.state.currentTimeStart) {
      this.timerId = setInterval(this.handleTick, 1000);
    }
  };

  startTimer = () => {
    this.setState(prevState => ({
      btnValue: !prevState.btnValue,
      currentTimeStart: new Date()
    }));
    this.timerId = setInterval(this.handleTick, 1000);
  };

  endTimer = () => {
    const {textFieldValue, timeSec} = this.state;

    if (textFieldValue.length > 0) {
      const timeStartInSec = this.formatTimeToSec(new Date(this.state.currentTimeStart));
      const timeEndInSec = this.formatTimeToSec(new Date());

      this.setState(prevState => ({
        btnValue: !prevState.btnValue,
        timeSec: 0,
        currentTimeStart: '',
        textFieldValue: '',
        tasks: [
          ...this.state.tasks,
          {
            name: textFieldValue,
            timeStart: this.formatTimeFromSec(timeStartInSec),
            timeEnd: this.formatTimeFromSec(timeEndInSec),
            timeSpend: this.formatTimeFromSec(timeSec)
          }
        ]
      }));
      clearInterval(this.timerId);
    } else {
      this.handleModalOpen();
    }
  };

  formatTimeToSec = (date) => {
    return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  };

  formatTimeFromSec = (sec) => {
    const h = sec / 3600 ^ 0;
    const m = (sec - h * 3600) / 60 ^ 0;
    const s = sec - h * 3600 - m * 60;
    return ( h < 10 ? "0" + h : h ) + ':' + ( m < 10 ? "0" + m : m ) + ':' + ( s < 10 ? "0" + s : s );
  };

  removeItem = (removableTask) => {
    const {tasks} = this.state;
    const filteredTasks = tasks.filter(task => {
      if (removableTask !== task) {
        return [...tasks];
      }
    });

    this.setState({
      tasks: filteredTasks
    });
  };

  render() {
    const {tasks, textFieldValue, openModal, btnValue} = this.state;
    const timeSec = this.formatTimeFromSec(this.state.timeSec);
    const actions = [
      <FlatButton
        label="CLOSE"
        primary={true}
        onTouchTap={this.handleModalClose}/>
    ];

    return (
      <div className={classes.main}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <TextField
            hintText="Start typing..."
            floatingLabelText="Name of your task"
            className={classes.textField}
            value={textFieldValue}
            onChange={this.handleTextFieldChange}
            ref="textField"/>
        </MuiThemeProvider>

        <MuiThemeProvider muiTheme={muiTheme}>
          <Dialog
            title="Empty task name"
            titleStyle={{color: "#bf2a5c"}}
            actions={actions}
            modal={true}
            open={openModal}>
            You are trying close your task without name, enter the title and try again!
          </Dialog>
        </MuiThemeProvider>

        <Timer timeSec={timeSec}
               startTimer={this.startTimer}
               endTimer={this.endTimer}
               btnValue={btnValue ? 'stop' : 'start'}/>

        <TableData tasks={tasks} removeItem={this.removeItem}/>
      </div>
    );
  }
}

export default Main;
