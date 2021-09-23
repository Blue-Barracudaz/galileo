import React from 'react';
import { shallow } from 'enzyme';
import Profile from '../../client/src/components/profile/Profile.jsx';
import Registration from '../../client/src/components/profile/Registration.jsx';

test('checks that Login component is rendering', () => {
  const wrapper = shallow(<Registration />, {disableLifecycleMethods: true})
  expect(wrapper.children()).toHaveLength(1);
});
