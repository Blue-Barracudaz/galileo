import React from 'react';
import { shallow } from 'enzyme';
import Booking from '../../client/src/components/booking/Booking.jsx';

describe('Booking Component', () => {

  const bookingComponentProps = {
    user_id: "10000",
    reservation: {
      address: '3930 Judah St, San Francisco, CA 94122',
      photo: 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778',
      price: 5,
      spot_id: 5,
      UNIXend: 1632546000,
      UNIXstart: 1632542400
    }
  }

  it('checks that booking component is rendering', () => {
    const wrapper = shallow(<Booking.WrappedComponent {...bookingComponentProps} />, {disableLifecycleMethods: true})
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.exists('#booking')).toBe(true);
  });
});


