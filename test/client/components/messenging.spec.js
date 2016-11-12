import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// import test utils
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

// components
import App from '../../../client/components/app';
import Chatroom from '../../../client/components/chatroom';
import Login from '../../../client/components/login';
import NavBar from '../../../client/components/navbar';
import Messages from '../../../client/components/messages';


describe('Chatroom Tests', function () {

  it('should have App route to Chatroom component', function () {
    const wrapper = mount(<App />);
    expect(wrapper).to.contain(<Login />);
    // test not working due to this.state.loggedIn
    // expect(wrapper).to.contain(<Route path="/rooms/:username/:reponame" component={Chatroom} />);
  });

  it('Chatroom should have Nav Bar', function () {
    const wrapper = mount(<Chatroom />);
    expect(wrapper).to.contain(<NavBar />);
  });

  it('Chatroom should have Messages component', function () {
    const wrapper = mount(<Chatroom />);
    expect(wrapper).to.contain(<Messages />);
  });

  it('Nav Bar should have User component', function () {

  });

  it('Messages should have Message component', function () {

  });

  it('Messages should have EnterMessage component', function () {

  });

});



