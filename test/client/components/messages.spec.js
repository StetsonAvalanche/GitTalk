import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// import test utils
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

// components
import Messages from '../../../client/components/messages';
import Message from '../../../client/components/message';

describe('Messages Tests', function() {

  it('Messages should have Message component', function() {
    const wrapper = mount(<Messages />);
    expect(wrapper).to.have.descendants(Message);
  });

});
