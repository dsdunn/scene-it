import React from 'react';
import { shallow } from 'enzyme';
import { Details } from './index';

describe.only('Details', () => {

  it('should match the snapshot', () => {
    const wrapper = shallow( <Details selectedEvent={'someEvent'}/>)
    expect(wrapper).toMatchSnapshot()
  });

  it('should render a genre/short bio if there are multiple performers', () => {
    const wrapper = shallow(<Details selectedEvent={{performers: {performer:[{short_bio: 'mockBio'}, 'another']}}} />)

    expect(wrapper.find('.details-genre').text()).toEqual('mockBio');
  });

  it('should render a genre/short bio if there is only one performer', () => {
    const wrapper = shallow(<Details selectedEvent={{performers: {performer:{short_bio:'singleMockBio'}}}}/>);

    expect(wrapper.find('.details-genre').text()).toEqual('singleMockBio');

  })

  it('should not render a genre/short bio if there is no performer', () => {
    const wrapper = shallow(<Details selectedEvent={{performers: undefined}}/>);

    expect(wrapper.find('.details-genre').text()).toEqual('');
  })

  it('should not render a genre/short bio if there is bio', () => {
    const wrapper = shallow(<Details selectedEvent={{performers: {performer:{long_bio:'singleMockBio'}}}}/>);

    expect(wrapper.find('.details-genre').text()).toEqual('');
  })

  it('should render some instructions if there is no selected event', () => {
    const wrapper = shallow(<Details />);

    expect(wrapper.find('.details').text()).toEqual('Scroll down from more. Click event for details.');
  })


})
