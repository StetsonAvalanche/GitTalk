import React, {PropTypes} from 'react';

import User from './user';

class NavBar extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const {username, reponame, channels} = this.props;
    return (
      <div>
        <User username={username} />
        <p>This is your {reponame} Chatroom</p>
        <p>Channels</p>
        <ul>
          {channels.map(channel => <li key={channel}>{channel}</li>)}
        </ul>
      </div>
    );
  }
}

export default NavBar;