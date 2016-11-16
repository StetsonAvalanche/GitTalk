import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import TopBar from './topbar';
import NavBar from './navbar';
import Messages from './messages';
import EnterMessage from './entermessage';
import Logout from './logout.js';

import { getUser } from './../api/user/userRequest.js';
import { grey200 } from './../util/colorScheme.js';
import {Card, CircularProgress} from 'material-ui';

import io from 'socket.io-client';
const socket = io('', { path: '/api/chat'});


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
      console.log(username, userAvatarUrl);
      this.setState({ 
        username: username,
        userAvatarUrl: userAvatarUrl
      });
      console.log(this.state);
    })
    .catch(err => console.log('error in getUser', err));
  }

  render() {
    return (
      <div>
        <NavBar username={this.state.username} photo={this.state.userAvatarUrl} channels={this.state.channels} />
        <TopBar reponame={ this.props.params.reponame } />

        {(this.state.username) ? 
          <Messages username={this.state.username} userAvatarUrl={this.state.userAvatarUrl} reponame={ this.props.params.reponame }/>
          : null}

        <Link to="/dashboard" className="link-to-dashboard">Home</Link>

        {(this.state.username) ? 
          <EnterMessage username={this.state.username} reponame={ this.props.params.reponame }/>
          : null
        } 
        
        <Logout />
      </div>
    );
  }
}

export default Chatroom;
