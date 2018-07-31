import React from 'react';
import { shallow } from 'enzyme';
import Body from './index';
import { mapStateToProps, mapDispatchToProps } from './index';
import { selectEvent } from '../../actions';

describe('Body', () => {
  const mockState = {
    events: ['one', 'two', 'three'],
    selectedEvent: {eventId: 1}
  }
  const mockProps = {
    store: {getState: jest.fn(()=>mockState), subscribe: jest.fn(), dispatch: jest.fn()}
  }

  it('matches the snapshot', () => {
    let wrapper = shallow(<Body {...mockProps}/>)
    expect(wrapper).toMatchSnapshot();
  })

  it.skip('creates an eventList', () => {
    let wrapper = shallow(<Body {...mockProps} />)

    const actual = wrapper.instance().eventList()

    expect(actual.length).toEqual(3);
  })

  it.skip('renders an EventCard for every event', () => {
    let wrapper = shallow(<Body {...mockProps}/>)
    expect(wrapper.find(EventCard).length).toEqual(3)
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

