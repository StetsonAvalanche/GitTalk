import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import TopBar from './topbar';
import NavBar from './navbar';
import Messages from './messages';
import Logout from './logout.js';

import { getUser } from './../api/user/userRequest.js';

import { grey200 } from './../util/colorScheme.js';

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      userAvatarUrl: '',
      channels: [  // FIXME 
        'aframe-boilerplate',
        'aframe-react',
        'aframe-react-boilerplate',
        'GitTalk',
        'material-ui-browserify-gulp-example',
        'microscope',
        'sembly-heroku-server'
      ]
    };
  }

  componentDidMount() {
    getUser()
    .then((data) => {
      const username = JSON.parse(data).username;
      const userAvatarUrl = JSON.parse(data)._json.avatar_url;
      this.setState({ 
        username: username,
        userAvatarUrl: userAvatarUrl
      });
    })
    .catch(err => console.log('error in getUser', err));
  }

  render() {
    return (
      <div>
        <NavBar username={this.state.username} photo={this.state.userAvatarUrl} channels={this.state.channels} />
        <TopBar reponame={ this.props.params.reponame } />
        <div style={styles.msgListContainer}>
          <Messages username={this.state.username} userAvatarUrl={this.state.userAvatarUrl}/>
        </div>
        <Link to="/dashboard" className="link-to-dashboard">Home</Link>
        <Logout />
      </div>
    );
  }
}

const styles = {
  msgListContainer: {
    minWidth: '400px',
    // flexGrow: '2',
    backgroundImage: 'url(./assets/chatRoomBackGround.png)'
    // backgroundImage: 'url(https://www.sketchappsources.com/resources/source-images-plus3/material-design-icon-patterns-3.png)'
  },
};

export default Chatroom;
