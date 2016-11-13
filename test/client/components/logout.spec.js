import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Logout from '../../../client/components/logout';

describe('<Logout />', () => {
  it('should render a link with logout class name', () => {
    const wrapper = shallow(<Logout />);
    expect(wrapper.find('.logout')).to.have.length(1);
  });
});
