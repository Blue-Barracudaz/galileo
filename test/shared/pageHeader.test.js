import React from 'react';
import { shallow } from 'enzyme';
import PageHeader from '../../client/src/components/shared/pageHeader/pageHeader.jsx';

describe ('pageHeader', () => {

  it('checks if the pageHeader component is hidden if set to be not visible', () => {
    const wrapper = shallow(<PageHeader isVisible={false} title={'test'} />);
    expect(wrapper.exists('.page-header')).toBe(false);
    expect(wrapper.text()).toBe('');
  });

  it('checks if the pageHeader component renders without back button', () => {
    const wrapper = shallow(<PageHeader title={'test'} />);
    expect(wrapper.exists('.page-header')).toBe(true);
    expect(wrapper.text()).toBe('TEST');
  });

  it('checks if the pageHeader component renders without back button', () => {
    const wrapper = shallow(<PageHeader isBackButtonVisible={true} title={'test'} />);
    expect(wrapper.exists('.page-header-back')).toBe(true);
    expect(wrapper.exists('.page-header-back-link')).toBe(true);
  });
});