import React, {PropTypes} from 'react';

import Message from './message';
import EnterMessage from './entermessage';
import { getMessages } from './../api/chatroom/messageRequest.js';

import io from 'socket.io-client';

import {Card, CircularProgress} from 'material-ui';

const socket = io('', { path: '/api/chat'});


class Messages extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
    };

    socket.on('new bc message', (message) => {
      this.setState({
        messages: [...this.state.messages, { user: message.user, text: message.text }]
      });
    });
  }

  componentDidMount() {
  // fetch all messages from DB
    getMessages('anicknam/gittalk')
    .then(messages => {
      this.setState({ messages: JSON.parse(messages) });
    })
    .catch(err => console.log(err));
  }

  render(){
    return (
      <div>
        <ul>
          {this.state.messages.map(message => <Message user={message.user} text={message.text} userAvatarUrl={this.props.userAvatarUrl}/>)}
        </ul>
        <EnterMessage username={this.props.username} socket={socket}/>
      </div>
    );
  }
}

const styles = {
};

export default Messages;