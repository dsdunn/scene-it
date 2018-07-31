import React from 'react';
import { shallow } from 'enzyme';
import { Details } from './Details';

describe.only('Details', () => {

  const wrapper = shallow( <Details />)
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})