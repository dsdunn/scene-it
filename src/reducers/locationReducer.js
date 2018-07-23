

export const location = (state = {}, action) => {
  switch (action.type) {
    case 'LOCATION_FETCH_SUCCESS':
      return action.location;
    default:
      return state;
  }
};