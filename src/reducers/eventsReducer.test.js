import { events, selectedEvent, hasErrored } from './eventsReducer';
import * as actions from '../actions';

describe('events reducer', () => {
  it('should return empty array when state is undefined', () => {
    const expected = [];
    const actual = events(undefined, {});

    expect(actual).toEqual(expected);
  })

  it('should add events', () => {
    const expected = [{event1: 'oh yeah'}, {event2: 'oh no'}];
    const actual = events(undefined, actions.eventsFetchSuccess(expected) )

    expect(actual).toEqual(expected)
  })
})

describe('selectedEvent', () => {

  it('should return null when state is undefined', () => {
    const expected = null;
    const actual = selectedEvent(undefined, {});

    expect(actual).toEqual(expected);
  })

  it('should return an event when given action type SELECT_EVENT', () => {
    const expected = {some: 'event'};
    const actual = selectedEvent(undefined, {type: 'SELECT_EVENT', event: {some: 'event'}});

    expect(actual).toEqual(expected);
  })

  it('should return null when given action type UNSELECT_EVENT', () => {
    const expected = null;
    const actual = selectedEvent(undefined, {type: 'UNSELECT_EVENT'});

    expect(actual).toEqual(expected);
  })

})

describe('hasErrored', () => {
  it('should return false if state is undefined', () => {
    const expected = false;
    const actual = hasErrored(undefined, {});

    expect(actual).toEqual(expected);
  })

  it('should return expected boolean', () => {
    const expected = true;
    const actual = hasErrored(false, actions.hasErrored(true));

    expect(actual).toEqual(expected);
  })
})