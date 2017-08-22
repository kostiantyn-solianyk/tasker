import {
  START_TIMER,
  HANDLE_MODAL_OPEN,
  HANDLE_MODAL_CLOSE,
  END_TIMER,
  REMOVE_ITEM
} from '../actions/actions';

const defaultState = {
  btnValue: false,
  currentTimeStart: '',
  textFieldValue: '',
  openModal: false,
  tasks: []
};
const stateFromLS = localStorage.getItem('state');
const initialState = stateFromLS ? JSON.parse(stateFromLS) : defaultState;

export default function (state = initialState, action) {
  switch (action.type) {
    case START_TIMER:
      return action.payload;

    case HANDLE_MODAL_OPEN:
      return action.payload;

    case HANDLE_MODAL_CLOSE:
      return action.payload;

    case END_TIMER:
      return action.payload;

    case REMOVE_ITEM:
      return action.payload;

    default:
      return {...state};
  }
}
