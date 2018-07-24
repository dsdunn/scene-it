export const isLoading = (bool) => ({
  type: 'IS_LOADING',
  isLoading: bool
});

export const hasErrored = (bool = false) => ({
  type: 'HAS_ERRORED',
  hasErrored: bool
});

export const eventsFetchSuccess = (events) => ({
  type: 'EVENTS_FETCH_SUCCESS',
  events: events
});

export const locationFetchSuccess = (location) => ({
  type: 'LOCATION_FETCH_SUCCESS',
  location: location
});