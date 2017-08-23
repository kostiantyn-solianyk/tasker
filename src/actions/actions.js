// ACTION NAMES
export const START_TIMER = 'START_TIMER';
export const HANDLE_MODAL_OPEN = 'HANDLE_MODAL_OPEN';
export const HANDLE_MODAL_CLOSE = 'HANDLE_MODAL_CLOSE';
export const END_TIMER = 'END_TIMER';
export const REMOVE_ITEM = 'REMOVE_ITEM';

// ACTION CREATORS
export const actionStartTimer = (state) => {
  return {
    type: START_TIMER,
    payload: {...state}
  };
};

export const actionHandleModalOpen = (state) => {
  return {
    type: HANDLE_MODAL_OPEN,
    payload: {...state}
  };
};

export const actionHandleModalClose = (state) => {
  return {
    type: HANDLE_MODAL_CLOSE,
    payload: {...state}
  };
};

export const actionEndTimer = (state) => {
  return {
    type: END_TIMER,
    payload: {...state}
  };
};

export const actionRemoveItem = (state) => {
  return {
    type: REMOVE_ITEM,
    payload: {...state}
  };
};
