import  { fetchEvents } from './fetchEvents';
import { isLoading, hasErrored, eventsFetchSuccess } from '../actions';
import { dataCleaner } from '../helper';

jest.mock('../helper')


describe('fetchEvents', () => {
  let mockUrl;
  let mockDispatch;

  beforeEach(() => {
    mockUrl = 'www.mockUrl.com';
    mockDispatch = jest.fn();
  })

  it('should dispatch hasErrored(true) if response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }));
    
    const thunk = fetchEvents(mockUrl);
    await thunk(mockDispatch);

    expect(mockDispatch).toBeCalledWith(hasErrored(true));
  })

  it('should dispatch eventsFetchSuccess if there are no errors', async () => {
    const mockEvents = {events: {event: 'one'}};

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockEvents)
      })
    )
    const dataCleaner = jest.fn()
    const thunk = fetchEvents(mockUrl);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(eventsFetchSuccess());
  })

})