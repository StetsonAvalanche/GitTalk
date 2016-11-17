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
import Message from '../../../client/components/message';
import EnterMessage from '../../../client/components/entermessage';
import User from '../../../client/components/user';

describe('Chatroom Tests', function() {

  it('Chatroom should have Nav Bar', function() {
    const wrapper = mount(<Chatroom params={{ username:'Felicia', reponame:'GitTalk' }} />);
    expect(wrapper).to.have.descendants(NavBar);
  });

  it('Chatroom should have Messages component', function() {
    const wrapper = mount(<Chatroom params={{ username:'Felicia', reponame:'GitTalk' }} />);
    expect(wrapper).to.have.descendants(Messages);
  });

  it('Chatroom should have EnterMessage component', function() {
    const wrapper = mount(<Chatroom />);
    expect(wrapper).to.have.descendants(EnterMessage);
  });

  it('Nav Bar should have User component', function() {
    const wrapper = mount(<NavBar username='Afsoon' reponame='GitTalk' repos={['GitTalk', 'GreenCast']}/>);
    expect(wrapper).to.have.descendants(User);
  });

  it('Messages should have Message component', function() {
    const wrapper = mount(<Messages />);
    expect(wrapper).to.have.descendants(Message);
  });

});
