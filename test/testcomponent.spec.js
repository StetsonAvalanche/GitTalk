/*

Ref:
https://semaphoreci.com/community/tutorials/testing-react-components-with-enzyme-and-mocha

 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import TestComponent from '../client/components/testcomponent';

describe('<TestComponent/>', function () {
  it('should have an image to display the gravatar', function () {
    const wrapper = shallow(<TestComponent/>);
    expect(wrapper.find('img')).to.have.length(1);
  });

  it('should have props for email and src', function () {
    const wrapper = shallow(<TestComponent/>);
    expect(wrapper.props().email).to.be.defined;
    expect(wrapper.props().src).to.be.defined;
  });
});