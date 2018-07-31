import * as actions from './index.js';

describe('actions',() => {

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

  it('should have a locationFetchSuccess action that returns a location object', () => {
    const expected = {
      type:"LOCATION_FETCH_SUCCESS",
      location: {lat: 2, lng: 3}
    }

    const actual = actions.locationFetchSuccess({lat: 2, lng: 3});

    expect(actual).toEqual(expected);
  })


  it('should have a selectEvent action that returns an event', () => {
    const expected = {
      type:"SELECT_EVENT",
      event: {cool: "yes"}
    }

    const actual = actions.selectEvent({cool: "yes"});

    expect(actual).toEqual(expected);
  })

  it('should have an unselectEvent action that returns null', () => {
    const expected = {
      type:"UNSELECT_EVENT",
    }

    const actual = actions.unselectEvent();

    expect(actual).toEqual(expected);
  })


})