import { location } from './locationReducer';
import * as actions from '../actions';

describe('events reducer', () => {
  it('should return empty object when state is undefined', () => {
    const expected = {};
    const actual = location(undefined, {});

    expect(actual).toEqual(expected);
  })

  it('should update location', () => {
    const expected = {lat: 'oh yeah', lng: 'oh no'};
    const actual = location(undefined, actions.locationFetchSuccess(expected) )

    expect(actual).toEqual(expected)
  })
})

