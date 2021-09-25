import React from 'react';
import { shallow } from 'enzyme';
import ParkingSpot from '../../client/src/components/shared/parkingSpot/parkingSpot.jsx';
import Trash from '../../client/src/components/shared/icons/trash.jsx';

describe ('Parking Spot', () => {
  const onClick = () => {
    console.log('CLICKED')
  }

  const wrapper = shallow(<ParkingSpot image='testImageUrl' address='Test address' date='24 September, 2021' time='08:00 AM - 09:00 AM' total={5} onIconClick={onClick} ActionIcon={Trash} />);

  it ('checks if the component exists', () => {
    expect(wrapper.exists('.spot')).toBe(true);
  });

  it('checks that the component is rendering children', () => {
    expect(wrapper.children()).toHaveLength(3);
  });
});