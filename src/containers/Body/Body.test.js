import React from 'react';
import { shallow } from 'enzyme';
import { Body } from './index';
import { mapStateToProps, mapDispatchToProps } from './index';
import { selectEvent } from '../../actions';


describe('Body', () => {

  const mockProps = {
    events: ['one', 'two', 'three'],
    selectedEvent: {eventId: 1},
    selectEvent: jest.fn(),
  }

  it('matches the snapshot', () => {
    let wrapper = shallow(<Body {...mockProps} />)
    expect(wrapper).toMatchSnapshot();
  })
})

describe('mapStateToProps', () => {
  it('should return an object with events and a selected event', () => {
    const mockState = {
      events: ['one', 'two', 'three'],
      randomKey: 'this shouldn\'t show up',
      selectedEvent: {eventId: 1}
    }
    const expected = {
      events: ['one', 'two', 'three'],
      selectedEvent: {eventId: 1}
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
})

