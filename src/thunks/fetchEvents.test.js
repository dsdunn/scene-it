import  { fetchEvents } from './fetchEvents';
import { isLoading, hasErrored, eventsFetchSuccess } from '../actions';

describe('fetchEvents', () => {
  let mockUrl;
  let mockDispatch;

  beforeEach(() => {
    mockUrl = 'www.mockUrl.com';
    mockDispatch = jest.fn();
  })

  it('should call dispatch with isLoading', () => {
    const thunk = fetchEvents(mockUrl);

    thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored(true) if response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }));
    
    const thunk = fetchEvents(mockUrl);
    await thunk(mockDispatch);

    expect(mockDispatch).toBeCalledWith(hasErrored(true));
    expect(mockDispatch).not.toBeCalledWith(isLoading(false));
  })

  it('should dispatch isLoading(false) if response.ok is true', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }));

    const thunk = fetchEvents(mockUrl);
    await thunk(mockDispatch);

    expect(mockDispatch).toBeCalledWith(isLoading(false));
  })

  it.only('should dispatch eventsFetchSuccess if there are no errors', async () => {
    const mockEvents = {events: {event: {one: 'event'}}};

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockEvents)
      })
    )
    

    const thunk = fetchEvents(mockUrl);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(eventsFetchSuccess());
  })

})