import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import RaisedButton from 'material-ui/RaisedButton';
import Login from '../../../client/components/login';
import RaisedButton from 'material-ui/RaisedButton';


describe('<Login />', () => {

  it('should have a Raised Button tag to login with GitHub', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('RaisedButton')).to.have.length(1);
  });

});
