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
      openModal: false,
      timeSec: 0,
      tasks: [
        { id:1, name: "title", timeStart: 10, timeEnd: 10, timeSpend: 10 }
      ]
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
      this.handleModalOpen();
    }
  };

  handleTextFieldChange = ({target: {value}}) => {
    this.setState({
      textFieldValue: value
    });
  };

  handleModalOpen = () => {
    this.setState({openModal: true});
  };

  handleModalClose = () => {
    this.setState({openModal: false});
    this.refs.textField.focus();
  };

  render() {
    const {timeSec, tasks} = this.state;
    const actions = [
      <FlatButton
        label="CLOSE"
        primary={true}
        onTouchTap={this.handleModalClose}/>
    ];

    return (
      <div className="tasker">
        <MuiThemeProvider muiTheme={muiTheme}>
          <TextField
            hintText="Start typing..."
            floatingLabelText="Name of your task"
            className="tasker__text-field"
            value={this.state.textFieldValue}
            onChange={this.handleTextFieldChange}
            ref="textField"/>
        </MuiThemeProvider>

        <MuiThemeProvider muiTheme={muiTheme}>
          <Dialog
            title="Empty task name"
            titleStyle={{color: "#bf2a5c"}}
            actions={actions}
            modal={true}
            open={this.state.openModal}>
            You are trying close your task without name, enter the title and try again!
          </Dialog>
        </MuiThemeProvider>

        <Timer timeSec={timeSec} startTimer={this.startTimer}
               btnValue={this.state.btnValue ? 'stop' : 'start'}/>

        <TableData tasks={tasks}/>
      </div>
    );
  }
}

export default Main;
