import React from 'react';
import { shallow } from 'enzyme';

import Picker from '../../client/src/components/shared/Picker.jsx';

describe('Picker initial', () => {
  const wrapper = shallow(<Picker options={['apple', 'banana']}/>);

  it('should exist', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.exists('label')).toBe(true);
  })

});
