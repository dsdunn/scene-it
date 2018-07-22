import { isLoading, hasErrored, eventsFetchSuccess } from '../actions';

export const fetchEvents = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(isLoading(false));
      const result = await response.json();
      dispatch(eventsFetchSuccess(result));
      console.log(result);
    } catch (error) {
      dispatch(hasErrored(true));
    }
  };
};