import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Login from '../../../client/components/login';
import RaisedButton from 'material-ui/RaisedButton';

describe('<Login />', () => {
  it('should have an anchor tag to login with GitHub', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(RaisedButton)).to.have.length(1);
  });
});
