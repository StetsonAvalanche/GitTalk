import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Dashboard from '../../../client/components/dashboard.js';
import Profile from '../../../client/components/profile.js';
import RepoList from '../../../client/components/repoList.js';
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

const user = {
  _json: 
  { login: 'chasestarr',
    id: 5317799,
    avatar_url: 'https://avatars.githubusercontent.com/u/5317799?v=3',
    gravatar_id: '',
    url: 'https://api.github.com/users/chasestarr',
    html_url: 'https://github.com/chasestarr',
    followers_url: 'https://api.github.com/users/chasestarr/followers',
    following_url: 'https://api.github.com/users/chasestarr/following{/other_user}',
    gists_url: 'https://api.github.com/users/chasestarr/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/chasestarr/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/chasestarr/subscriptions',
    organizations_url: 'https://api.github.com/users/chasestarr/orgs',
    repos_url: 'https://api.github.com/users/chasestarr/repos',
    events_url: 'https://api.github.com/users/chasestarr/events{/privacy}',
    received_events_url: 'https://api.github.com/users/chasestarr/received_events',
    type: 'User',
    site_admin: false,
    name: 'Chase Starr',
    company: null,
    blog: 'http://www.twitter.com/captivechains',
    location: 'San Francisco, CA',
    email: 'chasestarr@gmail.com',
    hireable: true,
    bio: null,
    public_repos: 39,
    public_gists: 9,
    followers: 9,
    following: 20,
    created_at: '2013-08-27T03:59:06Z',
    updated_at: '2016-11-14T16:43:27Z' 
  }
}

describe('<Dashboard />', () => {
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


  it('should render one <Profile /> component', () => {
    const wrapper = mountWithContext(<Dashboard />);
    wrapper.setState({ user: JSON.stringify(user) });
    expect(wrapper.find(Profile)).to.have.length(1);
  });

  it('should render one <RepoList /> component', () => {
    const wrapper = shallowWithContext(<Dashboard />);
    expect(wrapper.find(RepoList)).to.have.length(1);
  });

  it('should have state.repos initially set to []', () => {
    const wrapper = mountWithContext(<Dashboard />);
    expect(wrapper.state('repos')).to.eql([]);
  });

  it('should call componentDidMount at least once', () => {
    sinon.spy(Dashboard.prototype, 'componentDidMount');
    const wrapper = mountWithContext(<Dashboard />);
    expect(Dashboard.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('should render three <RepoListEntry /> when state.repos.length === 3', () => {
    const wrapper = mountWithContext(<Dashboard />);
    wrapper.setState({ repos: testRepos });
    expect(wrapper.find(RepoListEntry)).to.have.length(3);
  });

});
