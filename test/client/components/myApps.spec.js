import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';
import sinon from 'sinon';

import ReactTestUtils from 'react-addons-test-utils'; // ES6

chai.use(chaiEnzyme());
const expect = chai.expect;

/* import components */
import MyApps from '../../../client/components/myApps';
import MyAppsItem from '../../../client/components/myAppsItem';

/* import material-ui components */
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';

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

describe('MyApps Component', () => {
  const apps = [
                  { name: 'Giffy', 
                    category: 'utility',
                    endpoint: 'giffy.herokuapp.com', 
                    owner: 'gifcat', 
                    apiKey: '345catcat9dd053f663b8ed496d2a'
                  },
                  { name: 'Goofy', 
                    category: 'utility',
                    endpoint: 'goofy.herokuapp.com', 
                    owner: 'gifcow', 
                    apiKey: '345cowcow9dd053f663b8ed496d2a'
                  }
                ];

  const wrapper = shallowWithContext(<MyApps apps={apps} />);

  it('should contain a Paper', () => {
    expect(wrapper).to.have.descendants(Paper);
  });

  it('should contain a List', () => {
    expect(wrapper).to.have.descendants(List);
  });

  it('should contain a h8', () => {
    expect(wrapper).to.have.descendants('h8');
  });

  it('should contain a MyAppsItem', () => {
    expect(wrapper).to.have.descendants(MyAppsItem);
  });
});