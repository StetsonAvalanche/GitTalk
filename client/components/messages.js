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
        { user: 'Felicia', text: 'Snacks!' },
        { user: 'Chase', text: 'Wazzup peeps :)' },
        { user: 'Afsoon', text: 'Grrr!' },
        { user: 'Tony', text: 'I wanna nap!' },
      ],
    };

    // socket.on('new bc message', (message) => {
    //   this.setState({
    //     messages: [...this.state.messages, { user: message.user, text: message.text }]
    //   });
    // });
  }

  componentDidMount() {
  // fetch all messages from DB
    // getMessages('anicknam/gittalk')
    // .then(messages => {
    //   this.setState({ messages: JSON.parse(messages) });
    // })
    // .catch(err => console.log(err));
  }

  render() {
    const style = {
      backgroundImage: 'url(/assets/chatroomBackgroundLight.png)',
      backgroundSize: '50%',
      backgroundRepeat: 'repeat',
      position: 'absolute',
      left: 300,
      top: 0,
      width: window.innerWidth - 300,
      height: window.innerHeight - 55,
    };
    
    return (
      <div style={style}>
        <ul>
          {this.state.messages.map(message => <Message user={message.user} text={message.text} userAvatarUrl={this.props.userAvatarUrl}/>)}
        </ul>
      </div>
    );
  }
}

const styles = {
};

export default Messages;