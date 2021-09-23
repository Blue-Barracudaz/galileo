import React from 'react';
import { shallow } from 'enzyme';
import ManageSpots from '../../client/src/components/spotManagement/ManageSpots.jsx';
import TabSelector from '../../client/src/components/shared/tabSelector/TabSelector.jsx';
import Spot from '../../client/src/components/spotManagement/Spot.jsx'


test('checks that spot management component is rendering', () => {
  const wrapper = shallow(<Spot />, {disableLifecycleMethods: true})
  expect(wrapper.exists('.spot-card')).toBe(true);
});
