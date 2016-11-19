import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Login from '../../../client/components/login';

describe('<Login />', () => {
  it('should have an anchor tag to login with GitHub', () => {
    const wrapper = shallow(<Login />);
    console.log(wrapper.debug());
    expect(wrapper.find('.login')).to.have.length(1);
  });
});
