import React from 'react';
import { shallow ,mount} from 'enzyme';
import Profile from '../../client/src/components/profile/Profile.jsx';
import Registration from '../../client/src/components/profile/Registration.jsx';

test('checks that Registration component is rendering', () => {
  const wrapper = shallow(<Registration.WrappedComponent />, {disableLifecycleMethods: false})
  expect(wrapper.children()).toHaveLength(1);
  // expect(wrapper.find('registration')).toHaveLength(1);
  expect(wrapper.find('label').exists()).toEqual(true);
  expect(wrapper.find('form').exists()).toEqual(true);
});

test('checks that Profile component is rendering', () => {
  let wrapper = shallow(<Profile type={'update'} />, {disableLifecycleMethods: true})
  expect(wrapper.find(Registration).exists()).toEqual(true);
  wrapper = shallow(<Profile type={'registration'} />, {disableLifecycleMethods: true})
  expect(wrapper.find(Registration).exists()).toEqual(true);
  // expect(wrapper.find('registration')).toHaveLength(1);
  // expect(wrapper.find('label').exists()).toEqual(true);
  // expect(wrapper.find('form').exists()).toEqual(true);
});
