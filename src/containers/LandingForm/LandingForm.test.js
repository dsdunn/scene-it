import React from 'react';
import { shallow } from 'enzyme';
import LandingForm from './index';
import { mapStateToProps, mapDispatchToProps } from './index';
import { fetchEvents, fetchLocation, locationFetchSuccess } from '../../actions';

describe('BodyForm', () => {

  const mockState = {
    events: ['one', 'two', 'three'],
    selectedEvent: {eventId: 1},
    location: {lat:1, lng:2}
  }
  const mockProps = {
    store: {getState: jest.fn(()=>mockState), subscribe: jest.fn(), dispatch: jest.fn()}
  }

  it('should match the snapshot', () => {
    let wrapper = shallow(<LandingForm {...mockProps}/>);
    expect(wrapper).toMatchSnapshot();
  })
})