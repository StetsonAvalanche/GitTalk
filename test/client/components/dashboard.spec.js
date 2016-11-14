import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

import Dashboard from '../../../client/components/dashboard';
import Logout from '../../../client/components/logout';
import RepoList from '../../../client/components/repoList';
import RepoListEntry from '../../../client/components/repoListEntry.js';

const testRepos = [
  {
    id: 1,
    name: 'GitTalk'
  },
  {
    id: 2,
    name: 'React'
  },
  {
    id: 3,
    name: 'Enzyme'
  }
];

describe('<Dashboard />', () => {
  it('should render one <Logout /> component', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find(Logout)).to.have.length(1);
  });

  it('should render one <RepoList /> component', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find(RepoList)).to.have.length(1);
  });

  it('should have state.repos initially set to []', () => {
    const wrapper = mount(<Dashboard />);
    expect(wrapper.state('repos')).to.eql([]);
  });

  it('should render three <RepoListEntry /> when state.repos.length === 3', () => {
    const wrapper = mount(<Dashboard />);
    wrapper.setState({ repos: testRepos });
    expect(wrapper.find(RepoListEntry)).to.have.length(3);
  });

});
