import React from 'react';
import { EventCard } from '../EventCard';
import { shallow } from 'enzyme';

describe('EventCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EventCard event={{id: '3'}}/>)
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

})