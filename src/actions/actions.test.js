import * as actions from './index.js';

describe('actions',() => {

  it('should have an isLoading action', () => {
    const expected = {
      type: "IS_LOADING",
      isLoading: true
    }
    const actual = actions.isLoading(true)
    expect(actual).toEqual(expected);
  })

  it('should have an hasErrored action with a hasErrored key and a default of value false', () => {
    const expected = {
      type: "HAS_ERRORED",
      hasErrored: false
    }
    const actual = actions.hasErrored()
    expect(actual).toEqual(expected);
  })

  it('should have an eventsFetchSuccess action that returns an object with a list of events', () => {
    const expected = {
      type:"EVENTS_FETCH_SUCCESS",
      events: [{cool: "yes"}, {fail: "no!"}]
    }

    const actual = actions.eventsFetchSuccess([{cool: "yes"}, {fail: "no!"}]);

    expect(actual).toEqual(expected);
  })
})