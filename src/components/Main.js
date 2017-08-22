import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Timer from './Timer';
import TableData from './Table';
import Chart from './Chart';
import injectTapEventPlugin from 'react-tap-event-plugin';
import muiTheme from '../styles/StylesForMui';
import '../styles/Main.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  startTimer,
  handleModalOpen,
  handleModalClose,
  endTimer,
  removeItem
} from '../actions/actions';
injectTapEventPlugin();

const classes = {
  main: 'tasker',
  textField: 'tasker__text-field',
  btnStart: 'tasker__timer-button'
};

function formatTimeToSec (date) {
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}

function formatTimeFromSec (sec) {
  const h = sec / 3600 ^ 0;
  const m = (sec - h * 3600) / 60 ^ 0;
  const s = sec - h * 3600 - m * 60;
  return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

class Main extends Component {

  constructor (props) {
    super(props);
    this.state = {
      timeSec: 0,
      textFieldValue: ''
    };
  }

  handleModalOpen = () => {
    const props = this.props.initial;

    this.props.handleModalOpen({
      ...props,
      openModal: true
    });
  };

  handleModalClose = () => {
    const props = this.props.initial;

    this.props.handleModalClose({
      ...props,
      openModal: false
    });
    this.refs.textField.focus();
  };

  handleTextFieldChange = ({target: {value}}) => {
    this.setState({
      textFieldValue: value
    });
  };

  handleTick = () => {
    const props = this.props.initial;
    const currentTime = new Date();

    this.setState({
      timeSec: Math.floor((currentTime - new Date(props.currentTimeStart)) / 1000)
    });
  };

  componentDidUpdate = () => {
    localStorage.setItem('state', JSON.stringify(this.props.initial));
  };

  componentDidMount = () => {
    const props = this.props.initial;

    if (props.currentTimeStart) {
      this.timerId = setInterval(this.handleTick, 1000);
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.timerId);
  };

  startTimer = () => {
    const props = this.props.initial;

    this.props.startTimer({
      ...props,
      btnValue: true,
      currentTimeStart: new Date()
    });
    this.timerId = setInterval(this.handleTick, 1000);
  };

  endTimer = () => {
    const { timeSec, textFieldValue } = this.state;
    const props = this.props.initial;

    if (textFieldValue.length > 0) {
      const timeStartInSec = formatTimeToSec(new Date(props.currentTimeStart));
      const timeEndInSec = formatTimeToSec(new Date());

      this.props.endTimer({
        ...props,
        btnValue: false,
        currentTimeStart: '',
        tasks: [
          ...props.tasks,
          {
            name: textFieldValue,
            timeStart: formatTimeFromSec(timeStartInSec),
            timeStartInDateFormat: new Date(props.currentTimeStart),
            timeEnd: formatTimeFromSec(timeEndInSec),
            timeEndInDateFormat: new Date(),
            timeSpend: formatTimeFromSec(timeSec)
          }
        ]
      });

      this.setState({
        timeSec: 0,
        textFieldValue: ''
      });
      clearInterval(this.timerId);
    } else {
      this.handleModalOpen();
    }
  };

  removeItem = (removableTask) => {
    const props = this.props.initial;
    const {tasks} = props;
    const filteredTasks = tasks.filter(task => {
      if (removableTask !== task) {
        return [...tasks];
      }
    });

    this.props.removeItem({
      ...props,
      tasks: filteredTasks
    });
  };

  render () {
    const { textFieldValue } = this.state;
    const { tasks, openModal, btnValue } = this.props.initial;
    const timeSec = formatTimeFromSec(this.state.timeSec);
    const actions = [
      <FlatButton
        label='CLOSE'
        primary
        onClick={this.handleModalClose} />
    ];

    return (
      <div className={classes.main}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <TextField
              hintText='Start typing...'
              floatingLabelText='Name of your task'
              className={classes.textField}
              value={textFieldValue}
              onChange={this.handleTextFieldChange}
              ref='textField' />
            <Dialog
              title='Empty task name'
              titleStyle={{color: '#bf2a5c'}}
              actions={actions}
              modal
              open={openModal}>
              You are trying close your task without name, enter the title and try again!
            </Dialog>
          </div>
        </MuiThemeProvider>

        <Timer
          timeSec={timeSec}
          startTimer={this.startTimer}
          endTimer={this.endTimer}
          btnValue={btnValue ? 'stop' : 'start'}
          muiTheme={muiTheme} />
        <TableData tasks={tasks} removeItem={this.removeItem} muiTheme={muiTheme} />
        <Chart tasks={tasks} />
      </div>
    );
  };

}

function mapStateToProps (state) {
  return {
    initial: state.initial
  };
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators({
    startTimer: startTimer,
    handleModalOpen: handleModalOpen,
    handleModalClose: handleModalClose,
    endTimer: endTimer,
    removeItem: removeItem
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Main);
