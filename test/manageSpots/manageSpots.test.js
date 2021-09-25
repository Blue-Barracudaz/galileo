import React from 'react';
import { shallow, mount } from 'enzyme';
import ManageSpots from '../../client/src/components/spotManagement/ManageSpots.jsx';
import TabSelector from '../../client/src/components/shared/tabSelector/TabSelector.jsx';
import Spot from '../../client/src/components/spotManagement/Spot.jsx';
import SpotList from '../../client/src/components/spotManagement/SpotList.jsx';
import UpdateSpot from '../../client/src/components/spotManagement/UpdateSpot.jsx';
import AddSpot from '../../client/src/components/spotManagement/AddSpot.jsx';
import PageHeader from '../../client/src/components/shared/pageHeader/pageHeader.jsx';
import Button from '../../client/src/components/shared/button/button.jsx';

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

describe('manage spots component', () => {

  it('checks that manage spots component is rendering', () => {
    const wrapper = shallow(<ManageSpots.WrappedComponent />, {disableLifecycleMethods: true});
    expect(wrapper.exists('.host-home')).toBe(true);
  });

  it ('should render only the host component by default', () => {
    const wrapper = shallow(<ManageSpots.WrappedComponent />, {disableLifecycleMethods: true});
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.exists(TabSelector)).toBe(true);
    expect(wrapper.exists(UpdateSpot)).toBe(false);
    expect(wrapper.exists(AddSpot)).toBe(false);
  });

  it ('should render add-spot view when state changes', () => {
    const wrapper = shallow(<ManageSpots.WrappedComponent />, {disableLifecycleMethods: true});
    wrapper.setState({ addSpot: true });
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.exists(AddSpot)).toBe(true);
    expect(wrapper.exists(UpdateSpot)).toBe(false);
    expect(wrapper.exists(TabSelector)).toBe(false);
  });

  it ('should render update-spot view when state changes', () => {
    const wrapper = shallow(<ManageSpots.WrappedComponent />, {disableLifecycleMethods: true});
    wrapper.setState({ updateSpot: true });
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.exists(UpdateSpot)).toBe(true);
    expect(wrapper.exists(AddSpot)).toBe(false);
    expect(wrapper.exists(TabSelector)).toBe(false);
  });
});





