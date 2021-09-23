import React from 'react';
import { shallow } from 'enzyme';
import MyBookings from '../../client/src/components/myBookings/myBookings.jsx';
import ParkingSpot from '../../client/src/components/shared/parkingSpot/parkingSpot.jsx';
import TabSelector from '../../client/src/components/shared/tabSelector/TabSelector.jsx';
import PageHeader from '../../client/src/components/shared/pageHeader/pageHeader.jsx';

test('checks that MyBookings component is rendering', () => {
  const wrapper = shallow(<MyBookings />, {disableLifecycleMethods: true})
  console.log('MY BOOKINGS WRAPPER', wrapper.children().find(ParkingSpot))
  expect(wrapper.children()).toHaveLength(3);
  expect(wrapper.find(PageHeader).exists()).toBe(true)
  expect(wrapper.find(TabSelector).exists()).toBe(true)
});
