import React, {PropTypes} from 'react';
import TopBar from './topbar';
import NavBar from './navbar';
import Messages from './messages';
import EnterMessage from './entermessage';

import { getUser, getMemberRepos } from './../api/user/userRequest';
import { getMessages } from './../api/chatroom/messageRequest';
import { grey200 } from './../util/colorScheme';
import {Card, CircularProgress} from 'material-ui';

/* Websocket */
import io from 'socket.io-client';
const socket = io('', { path: '/api/chat'});

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      userAvatarUrl: '',
      channels: [],
      messages:[]
    };

    /* this bindings for methods */
    this.updateUser = this.updateUser.bind(this);
    this.updateMemberRepos = this.updateMemberRepos.bind(this);
    this.updateMessages = this.updateMessages.bind(this);

    /* websockets */
    socket.on('new bc message', (message) => {
      this.setState({
        messages: [...this.state.messages, message]
      });
      this.updateMemberRepos();
    });
  }

  componentDidMount() {
    this.updateUser();
    this.updateMessages();
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
      this.updateMemberRepos();
    })
    .catch(err => console.log('error in getUser', err));
  }

  updateMemberRepos() {
    getMemberRepos(this.state.username)
    .then(repos => {
      this.setState({
        channels: repos
      });
    })
    .catch(err => console.log('error in getMemberRepos', err));
  }

  updateMessages() {
    // fetch all messages from DB
    const chatroomId = this.props.params.username + '/' + this.props.params.reponame;
    getMessages(chatroomId)
    .then(messages => {
      this.setState({ messages: JSON.parse(messages) });
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <NavBar username={this.state.username} photo={this.state.userAvatarUrl} channels={this.state.channels} changeChannel={this.updateMessages}/>
        <TopBar reponame={this.props.params.reponame} />

        {(this.state.username) ? 
          <Messages messages={this.state.messages} />
          : null}

        {(this.state.username) ? 
          <EnterMessage username={this.state.username} chatroom={`${this.props.params.username}/${this.props.params.reponame}`} userAvatarUrl={this.state.userAvatarUrl} reponame={this.props.params.reponame} />
          : null
        } 
      </div>
    );
  }
}

export default Chatroom;
