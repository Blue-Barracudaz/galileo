import React from 'react';
import { shallow } from 'enzyme';
import Trash from '../../client/src/components/shared/icons/trash.jsx';

describe ('Trash', () => {
  const onClick = () => {
    console.log('CLICKED')
  }

  const wrapper = shallow(<Trash onIconClick={onClick} />);

  it ('checks if the component exists', () => {
    expect(wrapper.exists('svg')).toBe(true);
  });
});