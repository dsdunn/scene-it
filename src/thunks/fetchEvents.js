import { isLoading, hasErrored, eventsFetchSuccess } from '../actions';
import { dataCleaner } from '../helper';

export const fetchEvents = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url,{mode:"cors"});
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(isLoading(false));
      const result = await response.json();
      const cleanData = dataCleaner(result.events.event);
      dispatch(eventsFetchSuccess(cleanData));
      console.log(result.events.event);
    } catch (error) {
      dispatch(hasErrored(true));
    }
  };
};