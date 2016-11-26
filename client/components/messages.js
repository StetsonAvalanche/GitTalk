import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import Message from './message';
import { getMessages } from './../api/chatroom/messageRequest';

/* Websocket */
import io from 'socket.io-client';
const socket = io('', { path: '/api/chat'});

class Messages extends React.Component {
  constructor(props){
    super(props);

    /* this binding of methods */
    this.updateScroll = this.updateScroll.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
  }

  componentWillMount() {
    this.fetchMessages(this.props.chatroomId);
  }

  componentDidUpdate() {
    this.updateScroll();
  }

  // Ref: http://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up
  updateScroll() {
    let element = document.getElementById('messageBox');
    element.scrollTop = element.scrollHeight;
  }

  fetchMessages(chatroomId) {
    // fetch all messages from DB
    getMessages(chatroomId)
    .then(messages => {
      this.props.dispatch(actions.updateMessages(JSON.parse(messages)));
    })
    .catch(err => console.log(err));
  }

  render() {    
    let counter = 0;

    const messageRoomStyle = {
      backgroundImage: 'url(/assets/chatroomBackgroundLight.png)',
      backgroundSize: 75,
      backgroundRepeat: 'repeat',
      position: 'absolute',
      left: 300,
      top: 64,
      width: this.props.windowWidth - 300,
      height: this.props.windowHeight - 135,
      overflow: 'auto',
    };

    return (
      <div style={messageRoomStyle} id='messageBox'>
        {this.props.messages.map(message => 
          <Message 
            key={counter++}
            user={message.user} 
            text={message.text} 
            userAvatarUrl={message.userAvatarUrl}
            image={ message.image }/>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        authUser: state.authUser,
        repos: state.repos,
        messages: state.messages,
        chatroomId: state.activeChatroomId,
        windowSize: state.windowSize
    };
}

export default connect(mapStateToProps)(Messages);
