import React from 'react';
import { shallow } from 'enzyme';
import App from '../../client/src/components/app.jsx';

test('checks that app component is rendering', () => {
  const wrapper = shallow(<App />, {disableLifecycleMethods: true})
  expect(wrapper.children()).toHaveLength(8);
});
