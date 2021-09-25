import React from 'react';
import { shallow } from 'enzyme';
import ChevronRight from '../../client/src/components/shared/icons/chevronRight.jsx';

describe ('Chevron Right', () => {
  const onClick = () => {
    console.log('CLICKED')
  }

  const wrapper = shallow(<ChevronRight onIconClick={onClick} />);

  it ('checks if the component exists', () => {
    expect(wrapper.exists('svg')).toBe(true);
  });
});