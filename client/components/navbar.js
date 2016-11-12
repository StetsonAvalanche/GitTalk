import React, {PropTypes} from 'react';

import User from './user';

class NavBar extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const {username, reponame, repos} = this.props;
    return (
      <div>
        <User username={username} />
        <p>This is your {reponame} Chatroom</p>
        <p>Channels</p>
        <ul>
          {repos.map(repo => <li key={repo}>{repo}</li>)}
        </ul>
      </div>
    );
  }
}

export default NavBar;