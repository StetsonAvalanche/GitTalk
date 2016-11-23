import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';
import sinon from 'sinon';

import ReactTestUtils from 'react-addons-test-utils'; // ES6

chai.use(chaiEnzyme());
const expect = chai.expect;

/* import components */
import AddApp from '../../../client/components/addApp';
import AddAppItem from '../../../client/components/addAppItem';

/* import material-ui components */
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

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

describe('AddApp Component', () => {

  const wrapper = shallowWithContext(<AddApp reponame='tankwan/GitTalk' />);

  it('should contain a IconButton', () => {
    expect(wrapper).to.have.descendants(IconButton);
  });

  it('should contain a SettingsIcon', () => {
    expect(wrapper).to.have.descendants(SettingsIcon);
  });

  it('should contain a Dialog', () => {
    expect(wrapper).to.have.descendants(Dialog);
  });

});