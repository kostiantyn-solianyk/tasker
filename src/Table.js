import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const textColor = '#3249c7';
const classes = {
  tableWrapper: "tasker__table-wrapper",
  tableBody: "tasker__tbody",
  btnMargin: "tasker__table-btn"
};
const muiTheme = getMuiTheme({
  tableRow: {
    textColor: textColor
  },
  raisedButton: {
    textColor: textColor,
    fontSize: 10
  }
});

export default class TableData extends Component {

  componentWillReceiveProps = (nextProps) => {
    localStorage.setItem("tasks", JSON.stringify(nextProps.tasks));
  };

  render() {
    const {removeItem, tasks} = this.props;

    return (
      <div className={classes.tableWrapper}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>№</TableHeaderColumn>
                <TableHeaderColumn>Name of tasks</TableHeaderColumn>
                <TableHeaderColumn>Time start</TableHeaderColumn>
                <TableHeaderColumn>Time end</TableHeaderColumn>
                <TableHeaderColumn>Time spend</TableHeaderColumn>
                <TableHeaderColumn>Delete</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} className={classes.tableBody}>
              {tasks.map((task, idx) =>
                <TableRow key={idx}>
                  <TableRowColumn>{idx + 1}</TableRowColumn>
                  <TableRowColumn>{task.name}</TableRowColumn>
                  <TableRowColumn>{task.timeStart}</TableRowColumn>
                  <TableRowColumn>{task.timeEnd}</TableRowColumn>
                  <TableRowColumn>{task.timeSpend}</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton label="Delete" className={classes.btnMargin} onClick={() => {removeItem(task)
                    }}/>
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    )
  }
}

TableData.propTypes = {
  tasks: PropTypes.array,
  removeItem: PropTypes.func
};