import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

/* import components */
import CreateApp from '../../../client/components/createApp.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

describe('<CreateApp />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => {
    return shallow(node, {
      context: {muiTheme},
      childContextTypes: {muiTheme: React.PropTypes.object}
    });
  }

  const mountWithContext = (node) => {
    return mount(node, {
      context: {muiTheme},
      childContextTypes: {muiTheme: React.PropTypes.object}
    });
  }

  it('should render one <RaisedButton /> component', () => {
    const wrapper = shallowWithContext(<CreateApp />);
    expect(wrapper.find(RaisedButton)).to.have.length(1);
  });

  it('should render one <Dialog /> component', () => {
    const wrapper = shallowWithContext(<CreateApp />);
    expect(wrapper.find(Dialog)).to.have.length(1);
  });

  it('should initialize with state.open set to false', () => {
    const wrapper = mountWithContext(<CreateApp />);
    expect(wrapper.state('open')).to.equal(false);
  });

  it('should initialize with state.category set to false', () => {
    const wrapper = mountWithContext(<CreateApp />);
    expect(wrapper.state('category')).to.equal('');
  });

  it('should initialize with state.name set to false', () => {
    const wrapper = mountWithContext(<CreateApp />);
    expect(wrapper.state('name')).to.equal('');
  });

  it('should initialize with state.endpoint set to false', () => {
    const wrapper = mountWithContext(<CreateApp />);
    expect(wrapper.state('endpoint')).to.equal('');
  });

  it('should change state.open to true on handleOpen()', () => {
    const wrapper = mountWithContext(<CreateApp />);
    wrapper.instance().handleOpen();
    expect(wrapper.state('open')).to.equal(true);
  });

  it('should change state.open to false on handleClose()', () => {
    const wrapper = mountWithContext(<CreateApp />);
    wrapper.instance().handleOpen();
    wrapper.instance().handleClose();
    expect(wrapper.state('open')).to.equal(false);
  });

});

