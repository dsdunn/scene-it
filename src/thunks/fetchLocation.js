import { hasErrored, locationFetchSuccess } from '../actions';
import { mapKey } from '../apiKey';

export const fetchLocation = (location) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${mapKey}`
  return async (dispatch) => {
    try{
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const result = await response.json();
      const coordinates = result.results[0].geometry.location;
      dispatch(locationFetchSuccess(coordinates));
    } catch (error) {
      dispatch(hasErrored(true));
    }
  };
};