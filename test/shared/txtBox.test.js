
import React from 'react';
import { shallow } from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// configure({adapter: new Adapter()});

import TxtBox from '../../client/src/components/shared/txtBox/TxtBox.jsx';

describe('TxtBox initial', () => {
  const wrapper = shallow(<TxtBox />);

  it('should exist', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.exists('.txtBox')).toBe(true);
  })

});