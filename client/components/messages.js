import React, {PropTypes} from 'react';

import Message from './message';
import { getMessages } from './../api/chatroom/messageRequest.js';

/* Websocket */
import io from 'socket.io-client';
const socket = io('', { path: '/api/chat'});

class Messages extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
    };

    this.updateScroll = this.updateScroll.bind(this);

    socket.on('new bc message', (message) => {
      this.setState({
        messages: [...this.state.messages, message]
      });
    });
  }

  componentDidMount() {
  // fetch all messages from DB
    const chatroomId = this.props.username + '/' + this.props.reponame;
    getMessages(chatroomId)
    .then(messages => {
      this.setState({ messages: JSON.parse(messages) });
    })
    .catch(err => console.log(err));
    this.updateScroll();
  }

  componentDidUpdate() {
    this.updateScroll();
  }

  // Ref: http://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up
  updateScroll() {
    let element = document.getElementById('messageBox');
    element.scrollTop = element.scrollHeight;
  }

  render() {
    const style = {
      backgroundImage: 'url(/assets/chatroomBackgroundLight.png)',
      backgroundSize: '50%',
      backgroundRepeat: 'repeat',
      position: 'absolute',
      left: 300,
      top: 64,
      width: window.innerWidth - 300,
      height: window.innerHeight - 119,
      overflow: 'auto',
    };
    
    return (
      <div style={style} id='messageBox'>
        {this.state.messages.map(message => 
          <Message 
            user={message.user} 
            text={message.text} 
            userAvatarUrl={message.userAvatarUrl}/>)}
      </div>
    );
  }
}

<<<<<<< 39c15afebd5b01729bd873e199024cf0f7c8e363
export default Messages;
=======
export default Messages;
>>>>>>> (fix) enabling database calls in messages and local databse in server.js
