import React from 'react';
import { shallow, mount } from 'enzyme';
import { Map } from './index';

describe('MapDiv', () => {

  const mockProps = {
    center: {lat:1, lng: 2},
    events: [],
    selectedEvent: {some: 'event'}
  }

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Map {...mockProps}/>)
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})