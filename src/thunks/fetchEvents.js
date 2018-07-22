import { isLoading, hasErrored, eventsFetchSuccess } from '../actions';

export const fetchEvents = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url);
      const rawData = response.json();
      dispatch(eventsFetchSuccess(rawData));
      console.log(rawData);
    } catch (error) {
      throw Error(error.statusText);
      dispatch(hasErrored(true));
    }
  };
};