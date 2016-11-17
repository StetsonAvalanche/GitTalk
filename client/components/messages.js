import React, {PropTypes} from 'react';

import Message from './message';

/* Websocket */
import io from 'socket.io-client';
const socket = io('', { path: '/api/chat'});

class Messages extends React.Component {
  constructor(props){
    super(props);

    /* this binding of methods */
    this.updateScroll = this.updateScroll.bind(this);
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
    let counter = 0;
    return (
      <div style={messageRoomStyle} id='messageBox'>
        {this.props.messages.map(message => 
          <Message 
            key={counter++}
            user={message.user} 
            text={message.text} 
            userAvatarUrl={message.userAvatarUrl}
            image={ message.image }
          />)}
      </div>
    );
  }
}

const messageRoomStyle = {
  backgroundImage: 'url(/assets/chatroomBackgroundLight.png)',
  backgroundSize: '10%',
  backgroundRepeat: 'repeat',
  position: 'absolute',
  left: 300,
  top: 64,
  width: window.innerWidth - 300,
  height: window.innerHeight - 135,
  overflow: 'auto',
};

export default Messages;
