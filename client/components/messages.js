import React, {PropTypes} from 'react';

import Message from './message';
import EnterMessage from './entermessage';

import io from 'socket.io-client';

const socket = io('', { path: '/api/chat'});

class Messages extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [
        { user: 'Chase', text: 'Wazzup :)', id: 1},
        { user: 'Afsoon', text: 'I want ice cream', id: 2},
        { user: 'Felicia', text: 'Snack Reactor', id: 3},
        { user: 'Tony', text: 'I wanna nap', id: 4}
      ],
      messageid: 5
    };

    socket.on('new bc message', (message) => {
      this.setState({
        messages: [...this.state.messages, { user: message.user, text: message.text, id: this.state.messageid }],
        messageid: this.state.messageid + 1
      });    
    });
  }

  componentDidMount() {
  // fetch all messages from DB

  }

  render(){
    return (
      <div>
        <h1>Messages!</h1>
        <ul>
          {this.state.messages.map(message => <Message key={message.id} user={message.user} text={message.text} />)}
        </ul>
        <EnterMessage username={this.props.username} socket={socket}/>
      </div>
    );
  }
}

const styles = {
};

export default Messages;