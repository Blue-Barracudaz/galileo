import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../client/src/components/shared/button/button.jsx';

describe ('Button', () => {
  const wrapper = shallow(<Button text={'button-text'}/>);

  it('checks if the button component renders', () => {
    expect(wrapper.exists('.button')).toBe(true);
    expect(wrapper.text()).toBe('button-text');
  });
});