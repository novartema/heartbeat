import React from 'react';
import { mount, shallow } from 'enzyme';
import chai  from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Alert, Button, FormControl } from 'react-bootstrap';

import reducer from '_reducers';

import Login from '_containers/Login/Login.jsx';

chai.use(chaiEnzyme());

describe('<Login />', () => {
  it('should have an input for the email and password', function() {
    const store = createStore(reducer);
    const wrapper = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    chai.expect(wrapper.find('input')).to.have.length(2);
  });
  it('should have props for user and actions', function() {
    const store = createStore(reducer);
    const wrapper = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    chai.expect(wrapper.props().user).to.be.defined;
    chai.expect(wrapper.props().actions).to.be.defined;
  });
  it('should have a button', function() {
    const store = createStore(reducer);
    const wrapper = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    chai.expect(wrapper.find('button')).to.have.length(1);
  });
  it('should show wrong password field if it is empty', function() {
    const store = createStore(reducer);
    const wrapper = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    wrapper.find('input').at(0).simulate('change', { target: { value: 'testfront@welltory.com' } });
    chai.expect(wrapper.find('.glyphicon-remove')).to.have.length(1);
  });
  it('should show wrong email field if it isn\'t containing @ symbol', function() {
    const store = createStore(reducer);
    const wrapper = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    wrapper.find('input').at(0).simulate('change', { target: { value: 'testfrontwelltory.com' } });
    wrapper.find('input').at(1).simulate('change', { target: { value: 'testfront' } });
    chai.expect(wrapper.find('.glyphicon-remove')).to.have.length(1);
  });
});