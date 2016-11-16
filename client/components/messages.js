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
      messages: [
        // { user: 'Felicia', text: 'Snacks!' },
        // { user: 'Chase', text: 'Wazzup peeps :)' },
        // { user: 'Afsoon', text: 'Grrr!' },
        // { user: 'Tony', text: 'I wanna nap!' },
        // { user: 'Felicia', text: 'Snacks!' },
        // { user: 'Chase', text: 'Wazzup peeps :)' },
        // { user: 'Tony', text: 'I wanna nap!' },
        // { user: 'Felicia', text: 'Snacks!' },
        // { user: 'Chase', text: 'Wazzup peeps :)' },
      ],
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
            userAvatarUrl={this.props.userAvatarUrl}/>)}
      </div>
    );
  }
}

export default Messages;