import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';

import ReactTestUtils from 'react-addons-test-utils'; // ES6

chai.use(chaiEnzyme());
const expect = chai.expect;

import Chatroom from '../../../client/components/chatroom';
import NavBar from '../../../client/components/navbar';
import TopBar from '../../../client/components/topbar';
import Messages from '../../../client/components/messages';
import EnterMessage from '../../../client/components/entermessage';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme();                                                   

/* dependency required by material-ui */
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const shallowWithContext = (node) => {                                            
  return shallow(node, {                                                          
    context: {muiTheme},                                                          
    childContextTypes: {muiTheme: React.PropTypes.object}                         
  });                                                                             
};                                                                                 
                                                                                  
const mountWithContext = (node) => {                                              
  return mount(node, {                                                            
    context: {muiTheme},                                                          
    childContextTypes: {muiTheme: React.PropTypes.object}                         
  });                                                                             
};


describe('Chatroom Component', function () {

  const wrapper = shallowWithContext(<Chatroom params={{ username: 'oleg', reponame: 'assessment' }} />);

  it('should contain NavBar', function () {
    expect(wrapper).to.have.descendants(NavBar);
    console.log(wrapper.debug());
  });

  it('should contain TopBar', function () {
    expect(wrapper).to.have.descendants(TopBar);
  });

  it('should contain Messages if this.state.username is loaded', function () {
    wrapper.setState({ username: 'marcus' });
    expect(wrapper).to.have.descendants(Messages);
  });

  it('should contain EnterMessage if this.state.username is loaded', function () {
    wrapper.setState({ username: 'marcus' });
    expect(wrapper).to.have.descendants(EnterMessage);
  });

  it('should not contain Messages if this.state.username is blank', function () {
    wrapper.setState({ username: '' });
    expect(wrapper).to.not.have.descendants(Messages);
  });

  it('should not contain EnterMessage if this.state.username is blank', function () {
    wrapper.setState({ username: '' });
    expect(wrapper).to.not.have.descendants(EnterMessage);
  });

  it('should pass username, photo, and channels into NavBar', function () {
    wrapper.setState({ username: 'marcus', userAvatarUrl: 'face', channels: 'gittalk' });
    expect(wrapper.contains(<NavBar username='marcus' photo='face' channels='gittalk' />)).to.equal(true);
  });

  it('should pass reponame into TopBar', function () {
    expect(wrapper.contains(<TopBar reponame='assessment' />)).to.equal(true);
  });

  it('should pass username and reponame into Messages', function () {
    wrapper.setState({ username: 'marcus' });
    expect(wrapper.contains(<Messages username='oleg' reponame='assessment' />)).to.equal(true);
  });

  it('should pass username, chatroom and userAvatarUrl into EnterMessage', function () {
    wrapper.setState({ username: 'marcus', userAvatarUrl: 'face', channels: 'gittalk' });
    expect(wrapper.contains(<EnterMessage username='marcus' chatroom='oleg/assessment' userAvatarUrl='face'/>)).to.equal(true);
  });

  // console.log(wrapper.debug());

});
