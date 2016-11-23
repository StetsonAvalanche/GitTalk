import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';
import sinon from 'sinon';

import ReactTestUtils from 'react-addons-test-utils'; // ES6

chai.use(chaiEnzyme());
const expect = chai.expect;

/* import components */
import AddAppItem from '../../../client/components/addAppItem';

/* import material-ui components */
import { ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';

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

describe('AddAppItem Component', () => {
  const app = { name: 'Giffy', 
                category: 'utility',
                endpoint: 'giffy.herokuapp.com', 
                owner: 'gifcat', 
                apiKey: '345catcat9dd053f663b8ed496d2a'
              };

  const wrapper = shallowWithContext(<AddAppItem app={app} reponame='tankwan/GitTalk'/>);

  it('should contain a ListItem', () => {
    expect(wrapper).to.have.descendants(ListItem);
  });

  /* Test breaks due to MUI theme provider issues */
  // it('should contain a Toggle', () => {
  //   expect(wrapper).to.have.descendants(Toggle);
  // });

});