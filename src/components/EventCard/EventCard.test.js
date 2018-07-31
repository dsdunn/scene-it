import React from 'react';
import { EventCard } from '../EventCard';
import { shallow } from 'enzyme';

describe('EventCard', () => {
  let wrapper;
  const mockSelectEvent = jest.fn();
  const mockSelectedEvent = {eventId: '3'}

  beforeEach(() => {
    wrapper = shallow(<EventCard event={{eventId: '3'}}
      selectEvent={mockSelectEvent}
      selectedEvent={mockSelectedEvent}
      />)
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should call selectEvent on click', () => {
    wrapper.simulate('click');
    expect(mockSelectEvent).toBeCalled();
  })

  it('should have a class selected if event.eventId matches selectedEvent.id', () => {
    expect(wrapper.find('.selected').length).toEqual(1);
  })

  it('should not have a class selected if event.eventId does not match selectedEvent.id', () => {
    wrapper = shallow(<EventCard event={{id: '3'}}
      selectEvent={mockSelectEvent}
      selectedEvent={{eventId: 20}}
      />)
    expect(wrapper.find('.selected').length).toEqual(0);
  })

})