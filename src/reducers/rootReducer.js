import { combineReducers } from 'redux';
import { events, selectedEvent, hasErrored} from './eventsReducer';
import { location } from './locationReducer';

export const rootReducer = combineReducers({
  events,
  selectedEvent,
  hasErrored,  
  location
});
