import React, {PropTypes} from 'react';
import User from './user';

import {
  githubLightGreen,
  githubGreen,
  githubBrown,
  githubBlue,
  fullWhite,
  grey200,
} from './../util/colorScheme.js';

import Drawer from 'material-ui/Drawer';

class NavBar extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const {username, reponame, channels} = this.props;
    return (
      <div>
        <Drawer
          docked={true}
          width={200}
          onRequestChange={(open) => this.setState({open})}
        >
        </Drawer>
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