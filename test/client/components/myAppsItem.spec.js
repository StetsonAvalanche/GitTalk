import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';
import sinon from 'sinon';

import ReactTestUtils from 'react-addons-test-utils'; // ES6

chai.use(chaiEnzyme());
const expect = chai.expect;

/* import components */
import MyAppsItem from '../../../client/components/myAppsItem';

/* import material-ui components */
import Dialog from 'material-ui/Dialog';
import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ExtensionIcon from 'material-ui/svg-icons/action/extension';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme();                                                   

const shallowWithContext = (node) => {                                            
  return shallow(node, {                                                          
    context: {muiTheme},                                                          
    childContextTypes: {muiTheme: React.PropTypes.object.isRequired}                         
  });                                                                             
};                                                                                 

const mountWithContext = (node) => {                                              
  return mount(node, {                                                            
    context: {muiTheme},                                                          
    childContextTypes: {muiTheme: React.PropTypes.object.isRequired}                         
  });                                                                             
};

describe('MyAppsItem Component', () => {
  const app = { name: 'Goofy', 
                category: 'utility',
                endpoint: 'goofy.herokuapp.com', 
                owner: 'gifcow', 
                apiKey: '345cowcow9dd053f663b8ed496d2a'
              };

  const wrapper = shallowWithContext(<MyAppsItem key={app.name} app={app} />);

  it('should contain a ListItem', () => {
    expect(wrapper).to.have.descendants(ListItem);
  });

  it('should contain a Dialog', () => {
    expect(wrapper).to.have.descendants(Dialog);
  });

  /* Test breaks due to MUI theme provider issues */
  // it('should contain a ExtensionIcon', () => {
  //   expect(wrapper).to.have.descendants(ExtensionIcon);
  // });

});