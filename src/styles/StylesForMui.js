import getMuiTheme from 'material-ui/styles/getMuiTheme';

const textColor = '#3249c7';
const muiTheme = getMuiTheme({
  textField: {
    textColor: textColor,
    hintColor: textColor,
    focusColor: textColor
  },
  tableRow: {
    textColor: textColor
  },
  button: {
    height: 36,
    minWidth: 40
  },
  raisedButton: {
    textColor: textColor,
    fontSize: 12,
    minWidth: 40
  }
});

export default muiTheme;
