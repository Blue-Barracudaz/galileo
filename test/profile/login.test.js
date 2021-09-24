// import React from 'react';
// import { shallow } from 'enzyme';
// import Login from '../../client/src/components/login/Login.jsx';
// import LoginBox from '../../client/src/components/login/LoginBox.jsx';

// test('checks that Login component is rendering', () => {
//   const wrapper = shallow(<Login />, {disableLifecycleMethods: true})
//   expect(wrapper.children()).toHaveLength(1);
// });

import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({adapter: new Adapter()});

import Login from '../../client/src/components/login/Login.jsx';
import LoginBox from '../../client/src/components/login/LoginBox.jsx';

describe('checks that Login component is rendering', () => {

  describe('login initial', () => {

    // const spy = jest.spyOn(Login.prototype, 'componentDidMount');
    // const wrapper = shallow(<Login />);
    const wrapper = shallow(<Login />, {disableLifecycleMethods: true})

    it('should exist', () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.children()).toHaveLength(1);
    })

    it('should not render child components', () => {
      expect(wrapper.find(LoginBox).exists()).toBe(false);
    })

  })

  describe('checks that LoginBox component is rendering', () => {

    const wrapper = shallow(<LoginBox />, {disableLifecycleMethods: true})
    it('should exist', () => {
      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find('form').exists()).toEqual(true);
    })
  })

});
