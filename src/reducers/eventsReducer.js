

export const events = (state = [], action) => {
  switch (action.type) {
    case 'EVENTS_FETCH_SUCCESS':
      return [...action.events];
    default:
      return state;
  }
};

export const selectedEvent = (state = null, action) => {
  switch (action.type) {
    case 'SELECT_EVENT':
      return action.id;
    case 'UNSELECT_EVENT':
      return null;
    default: 
      return state;
  }
}

export const isLoading = (state = false, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return action.isLoading;
    default: return state;
  }
};

export const hasErrored = (state = false, action) => {
  switch (action.type) {
    case 'HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
};