import { combineReducers } from 'redux';
import { events, hasErrored, isLoading } from './eventsReducer';

export const rootReducer = combineReducers({
  events, hasErrored, isLoading
});