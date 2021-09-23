import React from 'react';
import { shallow } from 'enzyme';
import Booking from '../../client/src/components/booking/Booking.jsx';

test('checks that booking component is rendering', () => {
  const wrapper = shallow(<Booking />, {disableLifecycleMethods: true})
  expect(wrapper.children()).toHaveLength(1);
});

