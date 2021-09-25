import React from 'react';
import { mount, shallow } from 'enzyme';
import MapView  from '../../client/src/components/mapview/MapView.jsx';
import Map from '../../client/src/components/mapview/map.jsx';
import Search from '../../client/src/components/mapview/Search.jsx';
import ModalContent from '../../client/src/components/mapview/ModalContent.jsx'
import fakeSpots from '../../client/src/components/mapview/fakeSpots.js';

describe('MapView component', () => {
  const wrapper = shallow(<MapView.WrappedComponent />, {disableLifecycleMethods: true})

  it('renders and has the correct number of children', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.children()).toHaveLength(4);
  });

  it('contains a map component', () => {
    expect(wrapper.find(Map).exists()).toBe(true);
  });

  it('contains a search component', () => {
    expect(wrapper.find(Search).exists()).toBe(true);
  })

});

describe('Map component', () => {
  const wrapper = mount(<Map spots={fakeSpots}/>, {disableLifecycleMethods: true})
  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Search component', () => {
  const wrapper = shallow(<Search />, {disableLifecycleMethods: true});
  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Modal content', () => {
  const wrapper = shallow(<ModalContent />, {disableLifecycleMethods: true});
  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });
});