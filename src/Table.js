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

const TextColor = '#3249c7';
const muiTheme = getMuiTheme({
  tableRow: {
    textColor: TextColor
  },
  raisedButton: {
    textColor: TextColor,
    fontSize: 10
  }
});
const btnMargin = {
  marginTop: 18,
  marginBottom: 18
};

export default class TableData extends Component {

  render() {
    console.log(this.props.tasks);
    return (
      <div className="tasker__table-wrapper">
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
            <TableBody displayRowCheckbox={false}>
              {this.props.tasks.map((task, idx) =>
                  <TableRow selected={false} key={idx}>
                    <TableRowColumn>{task.id}</TableRowColumn>
                    <TableRowColumn>{task.name}</TableRowColumn>
                    <TableRowColumn>{task.timeStart}</TableRowColumn>
                    <TableRowColumn>{task.timeEnd}</TableRowColumn>
                    <TableRowColumn>{task.timeSpend}</TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton label="Delete" style={btnMargin}/>
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
  tasks: PropTypes.array
};