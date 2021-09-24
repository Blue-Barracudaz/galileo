import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../client/src/components/login/Login.jsx';
import LoginBox from '../../client/src/components/login/LoginBox.jsx';

test('checks that Login component is rendering', () => {
  const wrapper = shallow(<Login />, {disableLifecycleMethods: true})
  expect(wrapper.children()).toHaveLength(1);
  // expect(wrapper.find(LoginBox).exists()).toEqual(true);
});
