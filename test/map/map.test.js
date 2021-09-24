import React from 'react';
import { shallow } from 'enzyme';
import MapView from '../../client/src/components/mapview/MapView.jsx';

test('checks that MapView component is rendering', () => {
  const wrapper = shallow(<MapView />, {disableLifecycleMethods: true})
  expect(wrapper.children()).toHaveLength(1);
});