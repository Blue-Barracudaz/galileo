import React from 'react';
import { shallow } from 'enzyme';
import ManageSpots from '../../client/src/components/spotManagement/ManageSpots.jsx';
import TabSelector from '../../client/src/components/shared/tabSelector/TabSelector.jsx';
import Spot from '../../client/src/components/spotManagement/Spot.jsx';
import SpotList from '../../client/src/components/spotManagement/SpotList.jsx'


describe('spot component', () => {
  it('checks that spot component is rendering', () => {
    const wrapper = shallow(<Spot />, {disableLifecycleMethods: true})
    expect(wrapper.exists('.spot-card')).toBe(true);
  });
});

describe('spotlist component', () => {
  const spots = [
    {
      spot_id: 1,
      price: 1,
      photo_url: '',
      address: ''
    }
  ]
  it('checks that spotlist component is rendering', () => {
    const wrapper = shallow(<SpotList spots={spots}/>, {disableLifecycleMethods: true})
    expect(wrapper.exists('.spot-list')).toBe(true);
  });
});






