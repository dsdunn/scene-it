import React from 'react';
import { shallow, mount } from 'enzyme';
import { Map, mapStateToProps, mapDispatchToProps } from './index';
import { selectEvent, unselectEvent } from '../../actions';

describe('MapDiv', () => {

  const mockProps = {
    center: {lat:1, lng: 2},
    events: [],
    selectedEvent: {title: 'cool event', eventId: 1},
    selectEvent: jest.fn()
  }


  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Map {...mockProps}/>)
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should update the state on mount', () => {
    expect(wrapper.state('lat')).toEqual(1);
    expect(wrapper.state('lng')).toEqual(2);

  })

  it('should set state when showInfo is called and eventIds match', () => {
    wrapper.instance().showInfo({eventId: 1});
    expect(wrapper.state('infoText')).toEqual('cool event');
  })

  it('should not set state when eventIds don\'t match', () => {
    const newProps = {
    center: {lat:1, lng: 2},
    events: [],
    selectedEvent: {title: 'cool event', eventId: 6},
    selectEvent: jest.fn()
  }
    wrapper = shallow(<Map {...newProps} />)
    expect(wrapper.state('infoText')).toEqual(null)
  })
})

describe('mapStateToProps', () => {

  const mockState = {
      center: {lat:1, lng: 2},
      events: [],
      selectedEvent: {one: 'event'},
      extraProp: 'nothing in particular',
      something: 'everything'
    }

  it('should return an object with keys: center, events, selectedEvent', () => {
    const expected = {
      center: {lat:1, lng: 2},
      events: [],
      selectedEvent: {one: 'event'}
    }

    const mappedProps = mapStateToProps(mockState);

    expect(mappedProps).toEqual(expected);
  })
})

describe('mapDispatchToProps', () => {

  it('calls dispatch with selectEvent action when selectEvent is called', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = selectEvent({eventId: 1});
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.selectEvent({eventId: 1});
    expect(mockDispatch).toBeCalledWith(actionToDispatch)
  })

  it('calls dispatch with unselectEvent action when unselect is called', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = unselectEvent({eventId: 2});
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.unselectEvent({eventId: 2});
    expect(mockDispatch).toBeCalledWith(actionToDispatch);

  })
})




