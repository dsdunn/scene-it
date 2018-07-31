import React from 'react';
import { shallow, mount } from 'enzyme';
import { BodyForm } from './index';
import { mapStateToProps, mapDispatchToProps } from './index';
import { locationFetchSuccess } from '../../actions';
import { fetchEvents} from '../../thunks/fetchEvents';
import { fetchLocation } from '../../thunks/fetchLocation';
import { reverseGeocode } from '../../helper';

jest.mock('../../helper')
jest.mock('../../thunks/fetchEvents')
jest.mock('../../thunks/fetchLocation')


describe('BodyForm', () => {

  const mockFetchEvents = jest.fn().mockImplementation(() => Promise.resolve({status: 'ok'}));
  const mockFetchLocation = jest.fn().mockImplementation(() => Promise.resolve({status: 'ok'}));
  const mockSetLocation = jest.fn().mockImplementation(() => Promise.resolve({status: 'ok'}));
  const mockGoBack = jest.fn();
  const mockEvent = {
    preventDefault: jest.fn(),
    target: {id: 'status', value: 'ok, I guess'}
  }

  const mockProps = {
    events: ['one', 'two', 'three'],
    selectedEvent: {eventId: 1},
    location: {lat:1, lng:2},
    fetchEvents: mockFetchEvents,
    fetchLocation: mockFetchLocation,
    setLocation: mockSetLocation,
    history: {goBack: mockGoBack}
  }

  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementation((callback) => {
      return callback({coords: {latitude: 1, longitude:2}})
    })
  }

  let wrapper;

  beforeEach(()=>{
    wrapper = shallow(<BodyForm {...mockProps} />);
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should call handleChange on text input change', () => {
    wrapper = mount(<BodyForm {...mockProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleChange');

    wrapper.instance().forceUpdate();
    wrapper.find('#locationName').simulate('change', mockEvent);
    expect(spy).toHaveBeenCalled();
  })

  it('should update state when handleChange is called', () => {
    wrapper.instance().handleChange(mockEvent)
    expect(wrapper.state('status')).toEqual('ok, I guess');
  })

  it('should call handleSubmit on form submission', () => {
    wrapper = mount(<BodyForm {...mockProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');

    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit', mockEvent);
    expect(spy).toBeCalled();
  })

  it('should call mockFetchLocation when handleSubmit is called', async () => {
    await wrapper.instance().handleSubmit(mockEvent);
    expect(mockFetchLocation).toBeCalled();
  })

  it('should call mockFetchEvents when handleSubmit is called', async () => {
    await wrapper.instance().handleSubmit(mockEvent);
    expect(mockFetchEvents).toBeCalled();
  })

  it('should call useCurrent when checkbox is checked', () => {
    wrapper = mount(<BodyForm {...mockProps} />);
    const spy = jest.spyOn(wrapper.instance(), 'useCurrent');

    wrapper.instance().forceUpdate();
    wrapper.find('#use-current-location').simulate('change', mockEvent);
    expect(spy).toBeCalled();
  })

  it('should update the state when useCurrent is called', () => {
    global.navigator.geolocation = mockGeolocation;
    wrapper.instance().useCurrent(mockEvent);
    expect(wrapper.state('useCurrent')).toEqual(true);
  })

  it('should call mockSetLocation when useCurrent is called', async () => {
    global.navigator.geolocation = mockGeolocation;
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({results:[{address_components:[{types:['locality'],short_name:'JesusH!'}]}]})
      })
    )

    await wrapper.instance().useCurrent(mockEvent)
    expect(mockSetLocation).toBeCalled()
  })

  it('should return to / when goHome is called', () => {
    wrapper.instance().goHome();
    expect(mockGoBack).toBeCalled();
  })

})

describe('mapStateToProps', () => {
  it('should return an object with a location', () => {
    const mockState = {
      events: ['one', 'two', 'three'],
      randomKey: 'this shouldn\'t show up',
      selectedEvent: {eventId: 1},
      location: {lat: 1, lng: 2}
    }
    const expected = {
      location: {lat: 1, lng: 2}
    }
    const mappedProps = mapStateToProps(mockState);

    expect(mappedProps).toEqual(expected);
  })
})

describe('mapDispatchToProps', () => {

  it('calls dispatch with fetchEvents action when fetchEvents is called', () => {
    const mockDispatch = jest.fn();
    const mockUrl = 'someUrl';
    const actionToDispatch = fetchEvents(mockUrl);
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.fetchEvents(mockUrl);
    expect(mockDispatch).toBeCalledWith(actionToDispatch)
  })


  it('calls dispatch with fetchLocation action when fetchLocation is called', () => {
    const mockDispatch = jest.fn();
    const mockUrl = 'someUrl';
    const actionToDispatch = fetchLocation(mockUrl);
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.fetchLocation(mockUrl);
    expect(mockDispatch).toBeCalledWith(actionToDispatch)
  })

    it('calls dispatch with locationFetchSuccess action when setLocation is called', () => {
    const mockDispatch = jest.fn();
    const mockLocation = 'someLocation';
    const actionToDispatch = locationFetchSuccess(mockLocation);
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.setLocation(mockLocation);
    expect(mockDispatch).toBeCalledWith(actionToDispatch)
  })
})













