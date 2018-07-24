import { combineReducers } from 'redux';
import { events, hasErrored, isLoading } from './eventsReducer';
import { location } from './locationReducer';

export const rootReducer = combineReducers({
  events, 
  hasErrored, 
  isLoading, 
  location
});
