import React from 'react';
import {Link} from 'react-router';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';

import ReactTestUtils from 'react-addons-test-utils'; // ES6

chai.use(chaiEnzyme());
const expect = chai.expect;

import NavBar from '../../../client/components/navbar';
import User from '../../../client/components/user';
import Logout from '../../../client/components/logout';

import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';

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

describe('NavBar Component', function () {

  const wrapper = mountWithContext(<NavBar username='Oleg' photo='face' channels={['gittalk']} />);

  it('should contain Drawer', function () {
    expect(wrapper).to.have.descendants(Drawer);
  });

  it('should contain User', function () {
    expect(wrapper).to.have.descendants(User);
  });

  it('should contain h8', function () {
    expect(wrapper.find('h8')).to.exist;
  });

  it('should contain List', function () {
    expect(wrapper).to.have.descendants(List);
  });

  it('should contain Logout', function () {
    expect(wrapper).to.have.descendants(Logout);
  });

  it('should pass docked, width, style, and containerStyle into Drawer component', function () {
    expect(wrapper.find(Drawer)).to.have.props(['docked', 'width', 'style', 'containerStyle']);
  });

  it('should pass username, photo, and style into User component', function () {
    expect(wrapper.find(User)).to.have.props(['username', 'photo', 'style']);
  });

  // Note: did not check for key prop as enzyme throws warning if you do so
  it('should pass children and innerDivStyle into ListItem', function () {
    expect(wrapper.find(ListItem)).to.have.prop('children');
    expect(wrapper.find(ListItem)).to.have.prop('innerDivStyle');
  });

});
