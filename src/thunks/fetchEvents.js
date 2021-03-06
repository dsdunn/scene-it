import { hasErrored, eventsFetchSuccess } from '../actions';
import { dataCleaner } from '../helper';

export const fetchEvents = (url) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const result = await response.json();
      const cleanData = dataCleaner(result.events.event);
      dispatch(eventsFetchSuccess(cleanData));
    } catch (error) {
      dispatch(hasErrored(true));
    }
  };
};
