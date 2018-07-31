import  { fetchLocation } from './fetchLocation';
import { hasErrored, locationFetchSuccess } from '../actions';


describe('fetchLocation', () => {
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
    
    const thunk = fetchLocation(mockUrl);
    await thunk(mockDispatch);

    expect(mockDispatch).toBeCalledWith(hasErrored(true));
  })

  it('should dispatch locationFetchSuccess if there are no errors', async () => {
    const mockCoords = {results: [{geometry:{location: undefined}}]};

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockCoords)
      })
    )
    const thunk = fetchLocation(mockUrl);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(locationFetchSuccess());
  })
})