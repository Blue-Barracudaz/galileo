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

import { HashRouter as Router } from "react-router-dom"
import Login from '../../client/src/components/login/Login.jsx';
import LoginBox from '../../client/src/components/login/LoginBox.jsx';

jest.mock('axios', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    post: jest.fn()
  }
});

// let spy;
// afterEach(() => {
//   spy.mockClear()
// })

describe('checks that Login component is rendering', () => {

  describe('login initial', () => {

    // const spy = jest.spyOn(Login.prototype, 'componentDidMount');
    // const wrapper = shallow(<Login />);
    const wrapper = shallow(<Login.WrappedComponent />, {disableLifecycleMethods: true});
    const event = {
      preventDefault: () => {}
    };

    it('should exist', () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.children()).toHaveLength(1);

      // expect(wrapper.instance().handleChange()).toBeTruthy();
      expect(wrapper.instance().login()).toBeTruthy();
    })

    it('should render child components', () => {
      expect(wrapper.find(LoginBox).exists()).toBe(true);
    })

  })

  describe('checks that LoginBox component is rendering', () => {

    const wrapper = shallow(<LoginBox />, {disableLifecycleMethods: true})
    it('should exist', () => {
      expect(wrapper.children()).toHaveLength(1);
      expect(wrapper.find('form').exists()).toEqual(true);
    })
  })

  describe('login componentDidMount', () => {

    let spy = jest.spyOn(Login.WrappedComponent.prototype, 'componentDidMount');
    const wrapper = mount(<Router><Login.WrappedComponent /></Router>, {disableLifecycleMethods: true})
    // wrapper.instance().componentDidMount();
    it('should call componentDidMount once', () => {
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(3);
    })
    // spy.mockClear();

  })

  describe('handleChange', () => {

    let spy = jest.spyOn(Login.WrappedComponent.prototype, 'handleChange');
    const wrapper = mount(<Router><Login.WrappedComponent /></Router>, {disableLifecycleMethods: true})
    // wrapper.instance().handleChange();
    it('should not call handleChange once', () => {
      expect(spy).not.toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(0);
    })
    // spy.mockClear();

  })

  describe('login fn', () => {

    let spy = jest.spyOn(Login.WrappedComponent.prototype, 'login');
    const wrapper = mount(<Router><Login.WrappedComponent /></Router>, {disableLifecycleMethods: true})
    // wrapper.instance().login();
    it('should call login once', () => {
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
    })
    // spy.mockClear();
  })

  // describe('MockComponentEnzyme', ()=>{
  //   it('should get data', (done) => {
  //     const axios = require('axios');
  //     jest.spyOn(axios, 'default').mockResolvedValue({
  //       username: 'abc',
  //       password: 'b',
  //       message: 'c'
  //     })
  //     const wrapper = shallow(<Login.WrappedComponent />, {disableLifecycleMethods: true});
  //     const event = { preventDefault: () => {} };
  //     wrapper.instance().login();
  //     process.nextTick(()=>{
  //       expect(wrapper.state('error')).toBeFalsy();
  //       expect(wrapper.state().username).toEqual('abc');
  //       done();
  //     })
  //   })
  // })

  // describe('MockComponentEnzyme', ()=>{

  //   it('should handle error data', (done) => {
  //     const axios = require('axios');
  //     jest.spyOn(axios, 'default').mockRejectedValue()
  //     const wrapper = shallow(<Login.WrappedComponent />, {disableLifecycleMethods: true});
  //     wrapper.instance().login();
  //     process.nextTick(()=>{
  //       expect(wrapper.state('error')).toBeTruthy();
  //       done();
  //     })
  //   })
  // })

});
