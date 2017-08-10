import React, {Component} from 'react';
// import PropTypes from 'prop-types';
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
              <TableRow selected={false}>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>to do list</TableRowColumn>
                <TableRowColumn>22 22 22</TableRowColumn>
                <TableRowColumn>33 33 33</TableRowColumn>
                <TableRowColumn>2h 10m</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label="Delete" style={btnMargin}/>
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    )
  }
}