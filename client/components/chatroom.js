import React, {PropTypes} from 'react';
import TopBar from './topbar';
import NavBar from './navbar';
import Messages from './messages';
import EnterMessage from './entermessage';

import { getUser, getMemberRepos } from './../api/user/userRequest.js';
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
      channels: []
    };

    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.updateUser();
  }

  updateUser() {
    getUser()
    .then((data) => {
      const username = JSON.parse(data).username;
      const userAvatarUrl = JSON.parse(data)._json.avatar_url;
      this.setState({ 
        username: username,
        userAvatarUrl: userAvatarUrl
      });
      return username;
    })
    .then(username => {
      getMemberRepos(username)
      .then(repos => {
        this.setState({
          channels: repos
        });
      })
      .catch(err => console.log('error in getMemberRepos', err));
    })
    .catch(err => console.log('error in getUser', err));
  }

  render() {
    return (
      <div>
        <NavBar username={this.state.username} photo={this.state.userAvatarUrl} channels={this.state.channels} />
        <TopBar reponame={ this.props.params.reponame } />

        {(this.state.username) ? 
          <Messages username={this.state.username} reponame={ this.props.params.reponame }/>
          : null}

        {(this.state.username) ? 
          <EnterMessage username={this.state.username} reponame={ this.props.params.reponame } userAvatarUrl={this.state.userAvatarUrl}/>
          : null
        } 
      </div>
    );
  }
}

export default Chatroom;
