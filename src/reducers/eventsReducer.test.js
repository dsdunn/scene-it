import { events, isLoading, hasErrored } from './eventsReducer';
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

describe('isLoading', () => {
  it('should return false if state is undefined', () => {
    const expected = false;
    const actual = isLoading(undefined, {});

    expect(actual).toEqual(expected);
  })

  it('should return expected boolean', () => {
    const expected = true;
    const actual = isLoading(false, actions.isLoading(true));

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