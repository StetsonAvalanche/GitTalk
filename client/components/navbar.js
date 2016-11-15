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
    const {username, channels} = this.props;
    return (
      <div>
        <Drawer
          docked={true}
          width={300}
        >
          <img src={this.props.photo} />
          <p>tonyktan</p>
          <button>Logout</button>
          <h5>Channels</h5>
          <ul>
            {channels.map((channel) => <li>{channel}</li>)}
          </ul>
        </Drawer>
        <User username={username} />
        <p>Channels</p>
        <ul>
          {channels.map(channel => <li key={channel}>{channel}</li>)}
        </ul>
      </div>
    );
  }
}

export default NavBar;