import { combineReducers } from 'redux';
import InitialReducer from './reducer-initial';

const allReducers = combineReducers({
  initial: InitialReducer
});

export default allReducers;
