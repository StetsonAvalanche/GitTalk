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

describe('NavBar Component', () => {

  const wrapper = mountWithContext(<NavBar username='Oleg' photo='face' channels={['gittalk']} />);

  it('should contain Drawer', () => {
    expect(wrapper).to.have.descendants(Drawer);
  });

  it('should contain User', () => {
    expect(wrapper).to.have.descendants(User);
  });

  it('should contain h8', () => {
    expect(wrapper.find('h8')).to.exist;
  });

  it('should contain List', () => {
    expect(wrapper).to.have.descendants(List);
  });

  it('should contain Logout', () => {
    expect(wrapper).to.have.descendants(Logout);
  });

  it('should pass docked, width, style, and containerStyle into Drawer component', () => {
    expect(wrapper.find(Drawer)).to.have.props(['docked', 'width', 'style', 'containerStyle']);
  });

  it('should pass username, photo, and style into User component', () => {
    expect(wrapper.find(User)).to.have.props(['username', 'photo', 'style']);
  });

  // Note: did not check for key prop as enzyme throws warning if you do so
  it('should pass children and innerDivStyle into ListItem', () => {
    expect(wrapper.find(ListItem)).to.have.prop('children');
    expect(wrapper.find(ListItem)).to.have.prop('innerDivStyle');
  });

});
