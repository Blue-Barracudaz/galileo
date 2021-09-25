import React from 'react';
import { shallow } from 'enzyme';
import MyBookings from '../../client/src/components/myBookings/myBookings.jsx';
import ParkingSpot from '../../client/src/components/shared/parkingSpot/parkingSpot.jsx';
import TabSelector from '../../client/src/components/shared/tabSelector/TabSelector.jsx';
import PageHeader from '../../client/src/components/shared/pageHeader/pageHeader.jsx';

// test('checks that MyBookings component is rendering', () => {
//   const wrapper = shallow(<MyBookings />)
//   console.log('MY BOOKINGS WRAPPER', wrapper.children().find(ParkingSpot))
//   expect(wrapper.children()).toHaveLength(3);
//   expect(wrapper.find(PageHeader).exists()).toBe(true)
//   expect(wrapper.find(TabSelector).exists()).toBe(true)
// });

describe ('My Active Bookings', () => {
  const onClick = () => {
    console.log('CLICKED')
  }

  const wrapper = shallow(<MyBookings user_id={2} />, {disableLifecycleMethods: true});

  it ('checks if the component exists', () => {
    expect(wrapper.exists('.my-bookings')).toBe(true);
  });

  it('checks that the component is rendering children', () => {
    let bookings = {
      address: "location1",
      booking_id: 1,
      date: "September 10, 2021",
      end_time: "1631289600",
      host_id: 1,
      lat: "35.365787658151206",
      long: "-120.85217753135939",
      photo_url: "https://cdn.britannica.com/w:400,h:300,c:crop/86/139486-050-ED5968E0/England-Wayne-Rooney-World-Cup-Portugal-quarterfinal-2006.jpg",
      price: 5,
      renter_id: 2,
      spot_id: 3,
      start_time: "1631286000",
      time: "08:00 AM - 09:00 AM",
      total: 5,
      type: "driveway"
    }
    // wrapper.setState({bookings: bookings});
    expect(wrapper.children()).toHaveLength(3);
    expect(wrapper.exists('.my-bookings-list')).toBe(true);
    expect(wrapper.exists(TabSelector)).toBe(true);
    // expect(wrapper.exists(ParkingSpot)).toBe(true);
  });


});