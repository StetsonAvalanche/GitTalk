// create app leads to new entry
// my apps updates my apps

import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import CreateApp from '../../../client/components/createApp.js';

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

describe('CreateApp component', () => {
  
  it('should create entry when saveApp is clicked', () => {

  });

  it('should render one <DropzoneS3Uploader /> Component', () => {
    
  });

  it('should render one <DropzoneS3Uploader /> Component', () => {
    
  });

  it('should render one <DropzoneS3Uploader /> Component', () => {
    
  });

});