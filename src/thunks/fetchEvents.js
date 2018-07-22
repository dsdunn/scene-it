import { isLoading, hasErrored, eventsFetchSuccess } from '../actions';

export const fetchEvents = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url);
      const rawData = response.json();
      dispatch(eventsFetchSuccess(rawData));
      dispatch(isLoading(false));
      console.log(rawData);
    } catch (error) {
      dispatch(hasErrored(true));
      throw Error(error.statusText);
    }
  };
};